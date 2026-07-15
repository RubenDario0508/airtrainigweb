// ─────────────────────────────────────────────────────────────────────────────
// GlassCard — Frame-synchronized glassmorphism overlay system
// Inspired by Dogstudio / Active Theory depth-of-field card choreography
// ─────────────────────────────────────────────────────────────────────────────

export type CardPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center-overlay';

export type CardLifecycle = 'hidden' | 'entering' | 'visible' | 'exiting';

export interface GlassCardConfig {
  /** DOM element to control */
  element: HTMLElement;
  /** Frame where the card begins entering (0–219) */
  frameStart: number;
  /** Frame where the card finishes exiting (0–219) */
  frameEnd: number;
  /** Duration of enter transition in frames */
  enterFrames?: number;
  /** Duration of exit transition in frames */
  exitFrames?: number;
  /** Positioning mode */
  position?: CardPosition;
  /** Custom z-index layer */
  zIndex?: number;
}

// ─── EASING FUNCTIONS ─────────────────────────────────────────────────────────
// ease-out cubic: fast start, graceful deceleration (entering from far Z-plane)
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// ease-in quad: slow start, accelerating exit (receding into distance)
function easeInQuad(t: number): number {
  return t * t;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ─── CLASS ────────────────────────────────────────────────────────────────────
export class GlassCard {
  private el: HTMLElement;
  private frameStart: number;
  private frameEnd: number;
  private enterFrames: number;
  private exitFrames: number;
  private position: CardPosition;
  private _state: CardLifecycle = 'hidden';
  private _lastAppliedState: string = '';
  private _isVisible = false;
  private _observer: IntersectionObserver | null = null;

  constructor(config: GlassCardConfig) {
    this.el = config.element;
    this.frameStart = config.frameStart;
    this.frameEnd = config.frameEnd;
    this.enterFrames = config.enterFrames ?? 18;
    this.exitFrames = config.exitFrames ?? 14;
    this.position = config.position ?? 'top-left';

    // Apply positioning CSS class
    this.el.classList.add('glass-card', `glass-card--${this.position}`);

    // Set initial hidden state via direct style (no transition on mount)
    this.applyHidden();

    // IntersectionObserver: skip expensive style calcs for off-screen cards
    if (typeof IntersectionObserver !== 'undefined') {
      this._observer = new IntersectionObserver(
        ([entry]) => { this._isVisible = entry.isIntersecting; },
        { threshold: 0 }
      );
      this._observer.observe(this.el);
    } else {
      this._isVisible = true;
    }
  }

  get state(): CardLifecycle {
    return this._state;
  }

  // ─── PUBLIC API ───────────────────────────────────────────────────────────
  /** Call every frame with the current interpolated frame index */
  update(frame: number): void {
    // Skip if the card's parent is scrolled off-screen
    if (!this._isVisible) return;

    const enterEnd = this.frameStart + this.enterFrames;
    const exitStart = this.frameEnd - this.exitFrames;

    if (frame < this.frameStart || frame > this.frameEnd) {
      this.setHidden();
    } else if (frame < enterEnd) {
      // ENTERING: simulates approaching from a far Z-plane
      const rawT = (frame - this.frameStart) / this.enterFrames;
      const t = easeOutCubic(clamp(rawT, 0, 1));
      this.setEntering(t);
    } else if (frame > exitStart) {
      // EXITING: receding back into depth
      const rawT = (frame - exitStart) / this.exitFrames;
      const t = easeInQuad(clamp(rawT, 0, 1));
      this.setExiting(t);
    } else {
      this.setVisible();
    }
  }

  /** Force show (manual override) */
  show(): void {
    this.setVisible();
  }

  /** Force hide (manual override) */
  hide(): void {
    this.setHidden();
  }

  /** Cleanup observer */
  destroy(): void {
    this._observer?.disconnect();
  }

  // ─── PRIVATE STYLE MUTATIONS ──────────────────────────────────────────────
  // All mutations write directly to el.style for zero-layout-thrash performance

  private setHidden(): void {
    if (this._state === 'hidden') return;
    this._state = 'hidden';
    this.applyHidden();
  }

  private applyHidden(): void {
    const s = this.el.style;
    s.opacity = '0';
    s.filter = 'blur(10px)'; // Increased blur from 8px to 10px
    s.transform = this.buildTransform(75, 0.78); // Exaggerated translateY (from 30) and scale start (from 0.85)
    s.pointerEvents = 'none';
    s.willChange = 'auto';
  }

  private setEntering(t: number): void {
    this._state = 'entering';

    // Dedupe: build a key from the quantized progress to avoid redundant writes
    const key = `enter-${Math.round(t * 100)}`;
    if (this._lastAppliedState === key) return;
    this._lastAppliedState = key;

    const s = this.el.style;
    s.willChange = 'transform, opacity, filter';
    s.opacity = String(t);
    s.filter = `blur(${lerp(10, 0, t)}px)`;
    s.transform = this.buildTransform(lerp(75, 0, t), lerp(0.78, 1, t));
    s.pointerEvents = 'none';
  }

  private setVisible(): void {
    if (this._state === 'visible') return;
    this._state = 'visible';
    this._lastAppliedState = 'visible';

    const s = this.el.style;
    s.opacity = '1';
    s.filter = 'blur(0px)';
    s.transform = this.buildTransform(0, 1);
    s.pointerEvents = 'none'; // Container stays non-interactive; CTAs inside override
    s.willChange = 'auto';
  }

  private setExiting(t: number): void {
    this._state = 'exiting';

    const key = `exit-${Math.round(t * 100)}`;
    if (this._lastAppliedState === key) return;
    this._lastAppliedState = key;

    const s = this.el.style;
    s.willChange = 'transform, opacity, filter';
    s.opacity = String(1 - t);
    s.filter = `blur(${lerp(0, 5, t)}px)`;
    s.transform = this.buildTransform(lerp(0, -20, t), lerp(1, 1.06, t));
    s.pointerEvents = 'none';
  }

  /**
   * Builds the composite transform string.
   * center-overlay cards need the -50% centering offset preserved.
   */
  private buildTransform(ty: number, scale: number): string {
    if (this.position === 'center-overlay') {
      return `translateX(-50%) translateY(${ty}px) scale(${scale.toFixed(4)})`;
    }
    return `translateY(${ty}px) scale(${scale.toFixed(4)})`;
  }
}
