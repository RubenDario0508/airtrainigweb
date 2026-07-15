// ─────────────────────────────────────────────────────────────────────────────
// ScrollParallax — Multi-layer perspective tilt + scroll parallax engine
// Reference: Dogstudio, Aristide Benoist, Bruno Simon portfolio techniques
//
// Architecture: operates on [data-depth] wrapper elements. Does NOT touch
// inner card elements (those belong to GlassCard's lifecycle system).
// ─────────────────────────────────────────────────────────────────────────────

export interface ScrollParallaxConfig {
  /** Maximum lateral/vertical pixel shift from mouse (default 40) */
  maxShift?: number;
  /** Maximum rotation in degrees applied to scene container (default 8) */
  maxTilt?: number;
  /** Lerp factor for mouse follow (0–1). Lower = more cinematic (default 0.06) */
  lerpFactor?: number;
  /** Static Z offset multiplier per depth unit (default 60) */
  zDepthOffset?: number;
  /** CSS perspective value for the scene container (default 1200) */
  perspective?: number;
  /** Fraction of viewport scrolled before tilt effect fully fades (default 0.3) */
  scrollFadeDistance?: number;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

// ─── LAYER DESCRIPTOR ─────────────────────────────────────────────────────────
interface LayerEntry {
  el: HTMLElement;
  depth: number;        // 0 = background, 1 = foreground
  scrollSpeed: number;  // derived: 1 - depth (bg slow, fg fast)
}

export class ScrollParallax {
  // Config
  private maxShift: number;
  private maxTilt: number;
  private lerpFactor: number;
  private zDepthOffset: number;
  private perspective: number;
  private scrollFadeDistance: number;

  // DOM
  private container: HTMLElement | null = null;
  private scene: HTMLElement | null = null;
  private layers: LayerEntry[] = [];

  // Mouse state (normalized to [-0.5, 0.5])
  private targetX = 0;
  private targetY = 0;
  private currentX = 0;
  private currentY = 0;

  // Scroll state
  private scrollY = 0;
  private containerTop = 0;
  private containerHeight = 0;

  // Loop control
  private rafId: number | null = null;
  private isDestroyed = false;

  // Bound handlers for cleanup
  private _onMouseMove: (e: MouseEvent) => void;
  private _onScroll: () => void;
  private _onResize: () => void;
  private _tick: () => void;

  constructor(config: ScrollParallaxConfig = {}) {
    this.maxShift = config.maxShift ?? 40;
    this.maxTilt = config.maxTilt ?? 8;
    this.lerpFactor = config.lerpFactor ?? 0.06;
    this.zDepthOffset = config.zDepthOffset ?? 60;
    this.perspective = config.perspective ?? 1200;
    this.scrollFadeDistance = config.scrollFadeDistance ?? 0.3;

    this._onMouseMove = this.handleMouseMove.bind(this);
    this._onScroll = this.handleScroll.bind(this);
    this._onResize = this.handleResize.bind(this);
    this._tick = this.tick.bind(this);
  }

  // ─── PUBLIC API ───────────────────────────────────────────────────────────

  /**
   * Initialize the parallax system.
   * @param container   The scroll wrapper (height: 500vh)
   * @param scene       The sticky inner scene (height: 100vh, gets perspective + tilt)
   */
  init(container: HTMLElement, scene?: HTMLElement): void {
    this.container = container;
    this.scene = scene || container.querySelector<HTMLElement>('[data-parallax-scene]') || container;

    // Apply perspective to scene
    this.scene.style.perspective = `${this.perspective}px`;
    this.scene.style.transformStyle = 'preserve-3d';

    // Discover layers
    this.discoverLayers();

    // Mark layers with will-change for compositor promotion
    for (const layer of this.layers) {
      layer.el.style.willChange = 'transform';
    }

    // Measure
    this.measureContainer();

    // Attach listeners
    window.addEventListener('mousemove', this._onMouseMove, { passive: true });
    window.addEventListener('scroll', this._onScroll, { passive: true });
    window.addEventListener('resize', this._onResize, { passive: true });

    // Touch → reset to center so mobile doesn't get stuck with offset
    window.addEventListener('touchstart', () => {
      this.targetX = 0;
      this.targetY = 0;
    }, { passive: true });

    // Start rAF
    this.isDestroyed = false;
    this.rafId = requestAnimationFrame(this._tick);
  }

  /** Tear down everything */
  destroy(): void {
    this.isDestroyed = true;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('scroll', this._onScroll);
    window.removeEventListener('resize', this._onResize);

    // Remove will-change to free compositor memory
    for (const layer of this.layers) {
      layer.el.style.willChange = 'auto';
      layer.el.style.transform = '';
    }

    if (this.scene) {
      this.scene.style.transform = '';
      this.scene.style.perspective = '';
      this.scene.style.transformStyle = '';
    }

    this.layers = [];
    this.container = null;
    this.scene = null;
  }

  /** Manual frame update (if embedding in an external rAF loop) */
  update(): void {
    this.interpolate();
    this.applyTransforms();
  }

  // ─── DISCOVERY ────────────────────────────────────────────────────────────

  private discoverLayers(): void {
    if (!this.container) return;
    const els = this.container.querySelectorAll<HTMLElement>('[data-depth]');
    this.layers = [];

    els.forEach((el) => {
      const raw = el.getAttribute('data-depth');
      const depth = clamp(parseFloat(raw || '0'), 0, 1);
      this.layers.push({
        el,
        depth,
        scrollSpeed: 1 - depth,
      });
    });
  }

  // ─── EVENT HANDLERS ───────────────────────────────────────────────────────

  private handleMouseMove(e: MouseEvent): void {
    // Normalize cursor position to [-0.5, 0.5] relative to viewport center
    this.targetX = (e.clientX / window.innerWidth) - 0.5;
    this.targetY = (e.clientY / window.innerHeight) - 0.5;
  }

  private handleScroll(): void {
    this.scrollY = window.scrollY || window.pageYOffset;
  }

  private handleResize(): void {
    this.measureContainer();
  }

  private measureContainer(): void {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    this.containerTop = rect.top + (window.scrollY || window.pageYOffset);
    this.containerHeight = rect.height;
  }

  // ─── ANIMATION LOOP ──────────────────────────────────────────────────────

  private tick(): void {
    if (this.isDestroyed) return;

    this.interpolate();
    this.applyTransforms();

    this.rafId = requestAnimationFrame(this._tick);
  }

  private interpolate(): void {
    this.currentX = lerp(this.currentX, this.targetX, this.lerpFactor);
    this.currentY = lerp(this.currentY, this.targetY, this.lerpFactor);
  }

  /**
   * Batch all style writes in a single frame to avoid layout thrash.
   * This is the hot path — every property write is pre-calculated before touching the DOM.
   */
  private applyTransforms(): void {
    // ─── SCROLL COMPENSATION ──────────────────────────────────────────────
    // As the user scrolls through the container, the tilt effect fades out.
    // scrollProgress: 0 = at top of container, 1 = at bottom
    const relativeScroll = this.scrollY - this.containerTop;
    const scrollProgress = clamp(
      relativeScroll / (this.containerHeight * this.scrollFadeDistance),
      0,
      1
    );
    // Tilt reduction factor: 1 at top → 0 when scrolled past fadeDistance
    const tiltAttenuation = 1 - scrollProgress;

    // ─── SCENE CONTAINER TILT ─────────────────────────────────────────────
    if (this.scene) {
      const rotateX = this.currentY * this.maxTilt * tiltAttenuation;
      const rotateY = this.currentX * this.maxTilt * -1 * tiltAttenuation;
      this.scene.style.transform =
        `rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg)`;
    }

    // ─── PER-LAYER TRANSFORMS ─────────────────────────────────────────────
    for (const layer of this.layers) {
      const { depth } = layer;

      // Mouse-driven shift (attenuated by scroll)
      const tx = this.currentX * depth * this.maxShift * tiltAttenuation;
      const ty = this.currentY * depth * this.maxShift * tiltAttenuation;

      // Static Z-depth offset (creates parallax separation in 3D space)
      const tz = depth * this.zDepthOffset;

      layer.el.style.transform =
        `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, ${tz.toFixed(1)}px)`;
    }
  }
}
