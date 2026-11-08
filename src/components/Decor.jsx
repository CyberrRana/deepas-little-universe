import { useId } from 'react'

/* ── Sparkle / four-point star ─────────────────────────────────────────── */
export function Sparkle({ size = 20, className = '', style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M12 0c.55 6.32 5.13 10.9 12 12-6.87 1.1-11.45 5.68-12 12-.55-6.32-5.13-10.9-12-12C6.87 10.9 11.45 6.32 12 0Z" />
    </svg>
  )
}

/* ── Balloon with a curly string ───────────────────────────────────────── */
export function Balloon({
  color = 'pink',
  size = 76,
  className = '',
  style,
  delay = 0,
  sway = false,
}) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div
        className={sway ? 'animate-sway' : 'animate-float-y'}
        style={{ animationDelay: `${delay}s`, animationDuration: `${6.5 + (size % 5)}s` }}
      >
        <div className={`balloon balloon--${color}`} style={{ '--bw': `${size}px` }}>
          <svg
            className="balloon-string"
            viewBox="0 0 34 64"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M17 0c-7 12 8 18 2 30-5 10 3 16-1 24-2 4 0 8 0 10"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              className="text-ink-faint"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ── Soft clay cloud ──────────────────────────────────────────────────── */
export function ClayCloud({ width = 190, className = '', flip = false, delay = 0 }) {
  const raw = useId()
  const id = `cloud${raw.replace(/[^a-zA-Z0-9]/g, '')}`
  return (
    <svg
      width={width}
      viewBox="0 0 170 96"
      fill="none"
      className={`animate-float-y ${className}`}
      style={{
        animationDelay: `${delay}s`,
        transform: flip ? 'scaleX(-1)' : undefined,
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}a`} x1="24" y1="8" x2="110" y2="96" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#fdf6ff" />
          <stop offset="1" stopColor="#ecdcff" />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="40" y1="0" x2="120" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M41 90C20 90 5 77 5 61c0-15 12-27 28-29C37 17 50 6 67 6c18 0 33 13 37 30 3-1 6-1.5 9-1.5 18 0 32 13 32 29 0 15-13 26.5-31 26.5H41Z"
        fill={`url(#${id}a)`}
      />
      <path
        d="M41 84C24 84 12 73 12 60c8 7 20 10 32 8 8-1 14-5 18-10-1 12-10 22-21 26Z"
        fill={`url(#${id}b)`}
        opacity="0.7"
      />
      <ellipse cx="65" cy="34" rx="19" ry="12" fill="#ffffff" opacity="0.55" />
    </svg>
  )
}

/* ── A ribbon loop for the background ─────────────────────────────────── */
export function RibbonDoodle({ className = '', width = 220 }) {
  const raw = useId()
  const id = `rb${raw.replace(/[^a-zA-Z0-9]/g, '')}`
  return (
    <svg
      width={width}
      viewBox="0 0 220 90"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="220" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffd2e4" />
          <stop offset="0.5" stopColor="#ffb3d3" />
          <stop offset="1" stopColor="#c9b2ff" />
        </linearGradient>
      </defs>
      <path
        d="M6 66C40 20 76 30 96 52c14 16 32 22 52 10 20-13 28-38 65-50"
        stroke={`url(#${id})`}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M6 66C40 20 76 30 96 52c14 16 32 22 52 10 20-13 28-38 65-50"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ── Floating starburst cluster used on section edges ─────────────────── */
export function StarField({ count = 7, className = '' }) {
  const stars = Array.from({ length: count })
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {stars.map((_, i) => {
        const seed = (i * 137.508) % 100
        const seed2 = (i * 61.803) % 100
        return (
          <Sparkle
            key={i}
            size={8 + ((i * 7) % 12)}
            className="absolute animate-twinkle text-lav-400"
            style={{
              left: `${4 + seed * 0.92}%`,
              top: `${6 + seed2 * 0.84}%`,
              animationDelay: `${(i % 5) * 0.7}s`,
              opacity: 0.5,
            }}
          />
        )
      })}
    </div>
  )
}
