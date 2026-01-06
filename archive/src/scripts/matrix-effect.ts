// Use symbols with better font support across browsers
// Alchemical symbols, runic, Greek, and misc ancient-looking symbols
const ALCHEMICAL = '🜁🜂🜃🜄🜅🜆🜇🜈🜉🜊🜋🜌🜍🜎🜏🜐🜑🜒🜓🜔🜕🜖🜗🜘🜙🜚🜛🜜🜝🜞🜟🝀🝁🝂🝃🝄';
const RUNIC = 'ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟ';
const GREEK = 'αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ';
const SYMBOLS = '∆∇∞∮∯∰⊕⊗⊙⊛⊜⊝☉☽☾♃♄♅♆♇⚹✦✧✴✵✶✷✸✹⬡⬢⬣◈◇◆';

interface Particle {
  x: number;
  y: number;
  speed: number;
  char: string;
  depth: number;
  size: number;
  blur: number;
  opacityMult: number;
}

const PARTICLE_COUNT = 300; // Increased for more layers
const SPOTLIGHT_RADIUS_MIN = 100;
const SPOTLIGHT_RADIUS_MAX = 160;

// Depth layer definitions: [minDepth, maxDepth, blur, sizeMin, sizeMax, speedMin, speedMax, opacityMultiplier]
// Reduced opacity for more intimate, subtle effect
const DEPTH_LAYERS = [
  { min: 0, max: 0.15, blur: 4, sizeMin: 8, sizeMax: 12, speedMin: 0.1, speedMax: 0.2, opacityMult: 0.08 },   // Very far - heavy blur
  { min: 0.15, max: 0.3, blur: 2.5, sizeMin: 12, sizeMax: 16, speedMin: 0.2, speedMax: 0.35, opacityMult: 0.14 }, // Far - medium blur
  { min: 0.3, max: 0.5, blur: 1, sizeMin: 16, sizeMax: 22, speedMin: 0.35, speedMax: 0.5, opacityMult: 0.22 },  // Mid-far - slight blur
  { min: 0.5, max: 0.75, blur: 0, sizeMin: 22, sizeMax: 28, speedMin: 0.5, speedMax: 0.8, opacityMult: 0.32 },  // Mid-near - no blur
  { min: 0.75, max: 1, blur: 0, sizeMin: 28, sizeMax: 36, speedMin: 0.8, speedMax: 1.2, opacityMult: 0.42 },    // Near - crisp
];
const LERP_FACTOR = 0.08;
const FADE_RATE_MAX = 0.012; // Maximum fade per frame (~1.4 seconds to fully fade)
const BUILDUP_RATE_MAX = 0.0033; // ~5 seconds to full intensity at 60fps (1 / (60 * 5))
const MOVEMENT_THRESHOLD = 8; // Below this = stationary

// Static light sources (elements that emit light to reveal matrix)
const STATIC_LIGHT_RADIUS_MIN = 40;  // Very tight radius at low pulse
const STATIC_LIGHT_RADIUS_MAX = 120; // Moderate radius at high pulse
const STATIC_LIGHT_INTENSITY_MIN = 0.12; // Dimmer at low pulse
const STATIC_LIGHT_INTENSITY_MAX = 0.40; // Moderate at high pulse
const STATIC_LIGHT_PULSE_DURATION = 12000; // 12 seconds to match CSS animation

interface LightSource {
  x: number;
  y: number;
  radius: number;
  baseIntensity: number; // Base multiplier from data attribute
}

// Track page load time for CSS animation sync
const pageLoadTime = performance.now();

class MatrixEffect {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouseX = -1000;
  private mouseY = -1000;
  private spotlightX = -1000;
  private spotlightY = -1000;
  private animationId: number | null = null;
  private isRunning = false;
  private lingerIntensity = 0;
  private isMouseInViewport = false;
  private lastMouseX = -1000;
  private lastMouseY = -1000;
  private allChars: string;
  private staticLights: LightSource[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.allChars = ALCHEMICAL + RUNIC + GREEK + SYMBOLS;
    this.resize();
    this.initParticles();
    this.updateStaticLights();
    this.bindEvents();
  }

  private updateStaticLights() {
    this.staticLights = [];

    // Find elements with data-matrix-light attribute
    const lightElements = document.querySelectorAll('[data-matrix-light]');
    lightElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const baseIntensity = parseFloat(el.getAttribute('data-matrix-light') || '1');
      this.staticLights.push({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        radius: Math.max(rect.width, rect.height) / 2, // Base radius from element size
        baseIntensity
      });
    });
  }

  private getStaticLightPulse(): { intensity: number; radiusScale: number } {
    // Sync with CSS animation: use time since page load (same as CSS animation start)
    const elapsed = performance.now() - pageLoadTime;
    const progress = (elapsed % STATIC_LIGHT_PULSE_DURATION) / STATIC_LIGHT_PULSE_DURATION;
    // Sine wave: 0 -> 1 -> 0 over the cycle (matching CSS 0%, 50%, 100%)
    const pulse = Math.sin(progress * Math.PI);
    return {
      intensity: STATIC_LIGHT_INTENSITY_MIN + pulse * (STATIC_LIGHT_INTENSITY_MAX - STATIC_LIGHT_INTENSITY_MIN),
      radiusScale: STATIC_LIGHT_RADIUS_MIN + pulse * (STATIC_LIGHT_RADIUS_MAX - STATIC_LIGHT_RADIUS_MIN)
    };
  }

  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private getRandomChar(): string {
    const chars = [...this.allChars];
    return chars[Math.floor(Math.random() * chars.length)];
  }

  private createParticle(randomY = true): Particle {
    const depth = Math.random();

    // Find the layer this particle belongs to
    const layer = DEPTH_LAYERS.find(l => depth >= l.min && depth < l.max) || DEPTH_LAYERS[DEPTH_LAYERS.length - 1];

    // Calculate properties based on depth within the layer
    const layerProgress = (depth - layer.min) / (layer.max - layer.min);
    const size = layer.sizeMin + layerProgress * (layer.sizeMax - layer.sizeMin);
    const speed = layer.speedMin + layerProgress * (layer.speedMax - layer.speedMin);

    return {
      x: Math.random() * this.canvas.width,
      y: randomY ? Math.random() * this.canvas.height : -50,
      speed,
      char: this.getRandomChar(),
      depth,
      size,
      blur: layer.blur,
      opacityMult: layer.opacityMult
    };
  }

  private initParticles() {
    this.particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      this.particles.push(this.createParticle(true));
    }
    // Sort once by depth - maintain order during updates
    this.particles.sort((a, b) => a.depth - b.depth);
  }

  private getCurrentRadius(): number {
    return SPOTLIGHT_RADIUS_MIN + (SPOTLIGHT_RADIUS_MAX - SPOTLIGHT_RADIUS_MIN) * this.lingerIntensity;
  }

  private updateLingerIntensity() {
    if (!this.isMouseInViewport) {
      // Mouse left viewport - fade out progressively
      this.lingerIntensity = Math.max(0, this.lingerIntensity - FADE_RATE_MAX);
    } else {
      // Check movement since last frame
      const dx = this.mouseX - this.lastMouseX;
      const dy = this.mouseY - this.lastMouseY;
      const movement = Math.sqrt(dx * dx + dy * dy);

      // Update last position
      this.lastMouseX = this.mouseX;
      this.lastMouseY = this.mouseY;

      if (movement < MOVEMENT_THRESHOLD) {
        // Stationary - build up intensity
        this.lingerIntensity = Math.min(1, this.lingerIntensity + BUILDUP_RATE_MAX);
      } else {
        // Moving - fade down (but progressively, not instant)
        this.lingerIntensity = Math.max(0, this.lingerIntensity - FADE_RATE_MAX);
      }
    }
  }

  private update() {
    this.spotlightX += (this.mouseX - this.spotlightX) * LERP_FACTOR;
    this.spotlightY += (this.mouseY - this.spotlightY) * LERP_FACTOR;
    this.updateLingerIntensity();

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.y += p.speed;

      if (p.y > this.canvas.height + 50) {
        // Reuse particle instead of creating new one - just reset position and char
        p.x = Math.random() * this.canvas.width;
        p.y = -50;
        p.char = this.getRandomChar();
      }
    }
  }

  private calculateLightIntensity(px: number, py: number): number {
    let totalIntensity = 0;

    // Cursor spotlight contribution
    if (this.lingerIntensity > 0) {
      const currentRadius = this.getCurrentRadius();
      const dx = px - this.spotlightX;
      const dy = py - this.spotlightY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < currentRadius) {
        const falloff = 1 - Math.pow(distance / currentRadius, 1.5);
        totalIntensity += this.lingerIntensity * falloff;
      }
    }

    // Static light sources contribution (with pulsing sync to CSS)
    const pulse = this.getStaticLightPulse();
    for (const light of this.staticLights) {
      const effectiveRadius = light.radius + pulse.radiusScale;
      const dx = px - light.x;
      const dy = py - light.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < effectiveRadius) {
        const falloff = 1 - Math.pow(distance / effectiveRadius, 2);
        totalIntensity += light.baseIntensity * pulse.intensity * falloff;
      }
    }

    return Math.min(1, totalIntensity);
  }

  private render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Skip rendering if no light sources active
    const hasStaticLights = this.staticLights.length > 0;
    if (this.lingerIntensity <= 0 && !hasStaticLights) return;

    // Particles are pre-sorted by depth, no need to sort each frame
    for (const p of this.particles) {
      const lightIntensity = this.calculateLightIntensity(p.x, p.y);
      if (lightIntensity <= 0.01) continue;

      const opacity = p.opacityMult * lightIntensity;
      if (opacity <= 0.01) continue;

      this.ctx.save();
      this.ctx.font = `${p.size}px "Segoe UI Symbol", "Apple Symbols", "Noto Sans Symbols 2", sans-serif`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';

      // Simulate blur with reduced opacity and slight glow for far particles (cheaper than filter)
      if (p.blur > 0) {
        this.ctx.shadowColor = `rgba(34, 211, 238, ${opacity * 0.6})`;
        this.ctx.shadowBlur = p.blur * 3;
        this.ctx.fillStyle = `rgba(34, 211, 238, ${opacity * 0.7})`;
      } else {
        this.ctx.fillStyle = `rgba(34, 211, 238, ${opacity})`;
        // Glow effect for near particles
        if (p.depth > 0.5 && opacity > 0.15) {
          this.ctx.shadowColor = `rgba(34, 211, 238, ${opacity * 0.6})`;
          this.ctx.shadowBlur = 6 + (p.depth - 0.5) * 8;
        }
      }

      this.ctx.fillText(p.char, p.x, p.y);
      this.ctx.restore();
    }
  }

  private animate = () => {
    if (!this.isRunning) return;

    this.update();
    this.render();
    this.animationId = requestAnimationFrame(this.animate);
  };

  private handleMouseMove = (e: MouseEvent) => {
    // On first mouse move, initialize positions to avoid jump
    if (this.mouseX === -1000) {
      this.spotlightX = e.clientX;
      this.spotlightY = e.clientY;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    }
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.isMouseInViewport = true;
  };

  private handleMouseLeave = () => {
    // Mark mouse as left viewport - updateLingerIntensity will handle smooth fadeout
    this.isMouseInViewport = false;
  };

  private handleResize = () => {
    this.resize();
    this.updateStaticLights();
  };

  private handleScroll = () => {
    this.updateStaticLights();
  };

  private handleVisibilityChange = () => {
    if (document.hidden) {
      this.pause();
    } else {
      this.start();
    }
  };

  private bindEvents() {
    window.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseleave', this.handleMouseLeave);
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  private unbindEvents() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseleave', this.handleMouseLeave);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  pause() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  destroy() {
    this.pause();
    this.unbindEvents();
  }
}

let instance: MatrixEffect | null = null;
let eventsRegistered = false;

function createAndStartEffect() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const canvas = document.getElementById('matrix-bg') as HTMLCanvasElement;
  if (!canvas) return;

  if (instance) {
    instance.destroy();
    instance = null;
  }

  instance = new MatrixEffect(canvas);
  instance.start();
}

export async function initMatrixEffect() {
  if (typeof window === 'undefined') return;

  // Create initial effect
  createAndStartEffect();

  // Only register View Transition event listeners once
  if (!eventsRegistered) {
    eventsRegistered = true;

    document.addEventListener('astro:before-swap', () => {
      instance?.pause();
    });

    document.addEventListener('astro:page-load', () => {
      // Reinitialize with new canvas after page transition
      createAndStartEffect();
    });
  }
}
