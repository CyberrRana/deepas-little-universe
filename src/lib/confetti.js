/**
 * A tiny, dependency-free confetti + particle engine.
 *
 * One fixed, full-screen canvas serves the whole site. Bursts are expressed in
 * CSS pixels (client coordinates) so they can be aimed from any button, balloon
 * or the gift box. The engine is capped, DPR-aware, pauses when the tab is
 * hidden and stops its animation loop as soon as the last particle dies.
 */

export const PARTY_COLORS = [
  '#b39cf7',
  '#8a68e0',
  '#ff8fc0',
  '#ffb3d3',
  '#aed9fb',
  '#7fc9f2',
  '#ffe38c',
  '#ffc3a1',
  '#c4f4e2',
  '#fff6d8',
]

const STAR_COLORS = ['#ffe38c', '#fff6d8', '#ffb3d3', '#cdb9ff', '#ffffff']

const SHAPES = ['rect', 'circle', 'star', 'ribbon']

const rand = (min, max) => min + Math.random() * (max - min)
const pick = (arr) => arr[(Math.random() * arr.length) | 0]

function drawStar(ctx, size) {
  const spikes = 5
  const outer = size
  const inner = size * 0.45
  ctx.beginPath()
  for (let i = 0; i < spikes * 2; i += 1) {
    const radius = i % 2 === 0 ? outer : inner
    const angle = (Math.PI / spikes) * i - Math.PI / 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fill()
}

class ConfettiEngine {
  constructor() {
    this.canvas = null
    this.ctx = null
    this.particles = []
    this.raf = 0
    this.last = 0
    this.w = 0
    this.h = 0
    this.dpr = 1
    this.max = 560
    this.reduced = false
    this.onResize = this.onResize.bind(this)
    this.tick = this.tick.bind(this)
    this.onVisibility = this.onVisibility.bind(this)
  }

  attach(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
    document.addEventListener('visibilitychange', this.onVisibility)
    return () => this.detach()
  }

  detach() {
    window.removeEventListener('resize', this.onResize)
    document.removeEventListener('visibilitychange', this.onVisibility)
    this.clear()
    this.canvas = null
    this.ctx = null
  }

  onVisibility() {
    if (document.hidden) this.stop()
  }

  onResize() {
    if (!this.canvas || !this.ctx) return
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.w = window.innerWidth
    this.h = window.innerHeight
    this.canvas.width = Math.floor(this.w * this.dpr)
    this.canvas.height = Math.floor(this.h * this.dpr)
    this.canvas.style.width = `${this.w}px`
    this.canvas.style.height = `${this.h}px`
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
  }

  add(particle) {
    if (this.reduced) return
    if (this.particles.length >= this.max) return
    this.particles.push(particle)
    this.start()
  }

  make(x, y, angle, power, opts = {}) {
    const shape = opts.shape ?? pick(SHAPES)
    const size = rand(opts.sizeMin ?? 5, opts.sizeMax ?? 11)
    const life = rand(opts.lifeMin ?? 0.85, opts.lifeMax ?? 1.4)
    return {
      x,
      y,
      vx: Math.cos(angle) * power * rand(0.35, 1),
      vy: Math.sin(angle) * power * rand(0.35, 1),
      g: opts.gravity ?? rand(0.14, 0.26),
      drag: opts.drag ?? 0.988,
      size,
      w: shape === 'ribbon' ? size * 0.55 : size,
      h: shape === 'ribbon' ? size * 2 : size,
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.18, 0.18),
      tilt: rand(0, Math.PI * 2),
      vt: rand(0.06, 0.16),
      shape,
      color: opts.color ?? pick(opts.colors ?? PARTY_COLORS),
      life,
      decay: rand(0.008, 0.014) * (opts.slow ?? 1),
      sparkle: opts.sparkle ?? Math.random() < 0.18,
    }
  }

  burst(x, y, opts = {}) {
    const count = Math.round(
      (opts.count ?? 38) * (this.w < 640 ? 0.68 : 1) * (this.reduced ? 0 : 1)
    )
    const angle = ((opts.angle ?? -90) * Math.PI) / 180
    const spread = ((opts.spread ?? 360) * Math.PI) / 180
    const power = opts.power ?? 11
    for (let i = 0; i < count; i += 1) {
      const a = angle + rand(-spread / 2, spread / 2)
      this.add(this.make(x, y, a, power, opts))
    }
  }

  /** Big, joyful multi-burst from the middle of the screen. */
  celebrate(origin) {
    if (this.reduced) return
    const x = origin?.x ?? this.w / 2
    const y = origin?.y ?? this.h * 0.42
    this.burst(x, y, { count: 90, power: 17, spread: 360, gravity: 0.22 })
    this.burst(x, y - 20, {
      count: 40,
      power: 12,
      angle: -90,
      spread: 110,
      shape: 'star',
      colors: STAR_COLORS,
      sizeMin: 4,
      sizeMax: 9,
      gravity: 0.12,
      sparkle: true,
    })
    window.setTimeout(() => {
      this.burst(this.w * 0.1, this.h * 0.78, { count: 34, power: 16, angle: -62, spread: 50 })
      this.burst(this.w * 0.9, this.h * 0.78, { count: 34, power: 16, angle: -118, spread: 50 })
    }, 130)
  }

  /** Soft sprinkle of confetti from the top of the viewport. */
  rain(amount = 60) {
    if (this.reduced) return
    const count = Math.round(amount * (this.w < 640 ? 0.6 : 1))
    for (let i = 0; i < count; i += 1) {
      const p = this.make(rand(0, this.w), rand(-80, -10), Math.PI / 2, rand(1, 3), {
        gravity: 0.045,
        drag: 0.999,
        slow: 2.4,
        sizeMin: 4,
        sizeMax: 9,
      })
      p.life = 3.4
      this.add(p)
    }
  }

  firework(x, y) {
    if (this.reduced) return
    this.burst(x, y, {
      count: 76,
      power: 15,
      spread: 360,
      gravity: 0.06,
      drag: 0.962,
      colors: STAR_COLORS,
      shape: Math.random() < 0.5 ? 'star' : 'circle',
      sizeMin: 3,
      sizeMax: 8,
      slow: 2.1,
      sparkle: true,
    })
  }

  start() {
    if (this.raf || !this.ctx) return
    this.last = performance.now()
    this.raf = requestAnimationFrame(this.tick)
  }

  stop() {
    if (this.raf) cancelAnimationFrame(this.raf)
    this.raf = 0
  }

  clear() {
    this.particles.length = 0
    this.stop()
    if (this.ctx) this.ctx.clearRect(0, 0, this.w, this.h)
  }

  tick(now) {
    const ctx = this.ctx
    if (!ctx) return
    const dt = Math.min((now - this.last) / 16.667 || 1, 2.6)
    this.last = now
    ctx.clearRect(0, 0, this.w, this.h)
    const ps = this.particles

    for (let i = ps.length - 1; i >= 0; i -= 1) {
      const p = ps[i]
      p.vy += p.g * dt
      const drag = Math.pow(p.drag, dt)
      p.vx *= drag
      p.vy *= drag
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.rot += p.vr * dt
      p.tilt += p.vt * dt
      p.life -= p.decay * dt

      if (p.life <= 0 || p.y > this.h + 80 || p.x < -80 || p.x > this.w + 80) {
        ps.splice(i, 1)
        continue
      }

      const alpha = Math.min(1, p.life * 1.6)
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color

      if (p.shape === 'circle') {
        ctx.beginPath()
        ctx.arc(0, 0, p.size * 0.55, 0, Math.PI * 2)
        ctx.fill()
      } else if (p.shape === 'star') {
        drawStar(ctx, p.size * 0.72)
      } else if (p.shape === 'ribbon') {
        const squash = Math.abs(Math.cos(p.tilt))
        ctx.scale(1, Math.max(0.18, squash))
        ctx.beginPath()
        ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, p.w / 2)
        ctx.fill()
      } else {
        const squash = 0.35 + Math.abs(Math.cos(p.tilt)) * 0.65
        ctx.scale(1, squash)
        ctx.beginPath()
        ctx.roundRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.35, 1.5)
        ctx.fill()
      }

      if (p.sparkle) {
        ctx.globalAlpha = alpha * 0.85
        ctx.fillStyle = 'rgba(255,255,255,0.9)'
        ctx.beginPath()
        ctx.arc(0, 0, 1.3, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    if (ps.length) {
      this.raf = requestAnimationFrame(this.tick)
    } else {
      this.raf = 0
      ctx.clearRect(0, 0, this.w, this.h)
    }
  }
}

export const confetti = new ConfettiEngine()
