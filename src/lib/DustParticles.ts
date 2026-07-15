// ─────────────────────────────────────────────────────────────────────────────
// DustParticles — Depth-aware floating particle system
// Creates an atmospheric layer of drifting light specks with mouse + scroll
// parallax. Renders on its own transparent canvas for compositing.
// ─────────────────────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  depth: number;         // 0 = far background, 1 = close foreground
  driftX: number;        // ambient horizontal speed (px/frame)
  driftY: number;        // ambient vertical speed (px/frame)
  phase: number;         // sine wobble offset
  phaseSpeed: number;    // sine frequency
}

export interface DustConfig {
  count?: number;
  maxShift?: number;     // max mouse-driven pixel offset (default 30)
  scrollDrift?: number;  // scroll-velocity vertical drift multiplier (default 80)
  lerpFactor?: number;   // mouse follow smoothing (default 0.04)
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export class DustParticles {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private w = 0;
  private h = 0;

  // Mouse state (lerped)
  private mouseX = 0;
  private mouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;

  private maxShift: number;
  private scrollDrift: number;
  private lerpFactor: number;
  private time = 0;

  constructor(container: HTMLElement, config: DustConfig = {}) {
    const count = config.count ?? 150; // Double density default (from 70)
    this.maxShift = config.maxShift ?? 42; // +40% mouse sensitivity (from 30)
    this.scrollDrift = config.scrollDrift ?? 130; // More aggressive scroll drift (from 80)
    this.lerpFactor = config.lerpFactor ?? 0.04;

    // Create overlay canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:8';
    this.ctx = this.canvas.getContext('2d')!;
    container.appendChild(this.canvas);

    this.resize();
    this.spawn(count);

    // Mouse tracking
    window.addEventListener('mousemove', this._onMouse, { passive: true });
    window.addEventListener('resize', this._onResize, { passive: true });
    window.addEventListener('touchstart', () => {
      this.targetMouseX = 0;
      this.targetMouseY = 0;
    }, { passive: true });
  }

  private _onMouse = (e: MouseEvent) => {
    // Normalize to [-0.5, 0.5]
    this.targetMouseX = (e.clientX / window.innerWidth) - 0.5;
    this.targetMouseY = (e.clientY / window.innerHeight) - 0.5;
  };

  private _onResize = () => this.resize();

  private resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for perf
    this.w = window.innerWidth * dpr;
    this.h = window.innerHeight * dpr;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
  }

  private spawn(count: number): void {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: rand(0, 1),
        y: rand(0, 1),
        size: rand(1.5, 5.5), // Increased base size by ~80%
        opacity: rand(0.06, 0.45),
        depth: rand(0.1, 1),
        driftX: rand(-0.15, 0.15),
        driftY: rand(-0.08, -0.3), // upward drift (like dust in light)
        phase: rand(0, Math.PI * 2),
        phaseSpeed: rand(0.005, 0.02),
      });
    }
  }

  /**
   * Call once per rAF tick.
   * @param scrollVelocity  — delta between smooth scroll values (drives vertical rush)
   */
  update(scrollVelocity: number): void {
    // Lerp mouse follow
    this.mouseX += (this.targetMouseX - this.mouseX) * this.lerpFactor;
    this.mouseY += (this.targetMouseY - this.mouseY) * this.lerpFactor;
    this.time++;

    const ctx = this.ctx;
    const w = this.w;
    const h = this.h;

    ctx.clearRect(0, 0, w, h);

    for (const p of this.particles) {
      // Ambient drift
      p.x += p.driftX / w;
      p.y += p.driftY / h;

      // Scroll-driven vertical rush
      p.y -= scrollVelocity * this.scrollDrift * p.depth / h;

      // Wrap around edges
      if (p.x < -0.05) p.x = 1.05;
      if (p.x > 1.05) p.x = -0.05;
      if (p.y < -0.05) p.y = 1.05;
      if (p.y > 1.05) p.y = -0.05;

      // Sine wobble for organic floating
      const wobbleX = Math.sin(this.time * p.phaseSpeed + p.phase) * 0.3;
      const wobbleY = Math.cos(this.time * p.phaseSpeed * 0.7 + p.phase) * 0.2;

      // Mouse parallax shift (foreground particles move more)
      const mx = this.mouseX * p.depth * this.maxShift;
      const my = this.mouseY * p.depth * this.maxShift;

      // Final position
      const px = p.x * w + mx + wobbleX;
      const py = p.y * h + my + wobbleY;

      // Draw — bokeh for close particles (depth > 0.7), fillRect for far/tiny ones
      const dpr = this.w / window.innerWidth;
      // Exponentially scale up closer particles to act as strong depth anchors (bokeh DOF)
      const size = p.size * dpr * (p.depth > 0.7 ? 3.0 : 1.0);
      ctx.globalAlpha = p.opacity * (p.depth > 0.7 ? 0.6 : 1.0);

      if (p.depth > 0.7) {
        // Soft out-of-focus circle (bokeh) for simulated depth of field
        const grad = ctx.createRadialGradient(px, py, 0, px, py, size / 2);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px - size / 2, py - size / 2, size, size);
      }
    }

    ctx.globalAlpha = 1;
  }

  destroy(): void {
    window.removeEventListener('mousemove', this._onMouse);
    window.removeEventListener('resize', this._onResize);
    this.canvas.remove();
    this.particles = [];
  }
}
