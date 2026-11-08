import { AnimatePresence, motion } from 'framer-motion'

const CANDLES = [
  { left: '14%', height: 40, stripe: '#ff8fc0', delay: 0 },
  { left: '34%', height: 54, stripe: '#8ac5f6', delay: 0.25 },
  { left: '54%', height: 44, stripe: '#ffe38c', delay: 0.5 },
  { left: '74%', height: 50, stripe: '#b39cf7', delay: 0.15 },
  { left: '88%', height: 38, stripe: '#7fd4b4', delay: 0.65 },
]

const SPRINKLES = [
  { left: '14%', top: '38%', rotate: 24, color: '#ff8fc0' },
  { left: '28%', top: '58%', rotate: -18, color: '#8ac5f6' },
  { left: '43%', top: '32%', rotate: 62, color: '#ffe38c' },
  { left: '58%', top: '60%', rotate: 12, color: '#b39cf7' },
  { left: '72%', top: '40%', rotate: -40, color: '#ffc3a1' },
  { left: '86%', top: '64%', rotate: 30, color: '#7fd4b4' },
]

function Sprinkles({ density = 1 }) {
  return SPRINKLES.slice(0, Math.max(3, Math.round(SPRINKLES.length * density))).map(
    (sprinkle, index) => (
      <span
        key={index}
        className="sprinkle"
        style={{
          left: sprinkle.left,
          top: sprinkle.top,
          background: sprinkle.color,
          transform: `rotate(${sprinkle.rotate}deg)`,
        }}
        aria-hidden="true"
      />
    )
  )
}

function Candle({ candle, lit, index }) {
  return (
    <div
      className="absolute bottom-0 flex -translate-x-1/2 flex-col items-center"
      style={{ left: candle.left }}
    >
      <div className="relative" style={{ height: candle.height, width: 11 }}>
        <span
          className="candle block h-full w-full"
          style={{
            background: `repeating-linear-gradient(-45deg, #fff8fd 0 4px, ${candle.stripe} 4px 8px)`,
          }}
        />
        <AnimatePresence>
          {lit ? (
            <motion.span
              key="flame"
              className="flame"
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.1, y: -6 }}
              transition={{ duration: 0.35 }}
              style={{ animationDelay: `${candle.delay}s` }}
            />
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!lit ? (
          <motion.div key="smoke" className="absolute" style={{ bottom: candle.height + 4 }}>
            {[0, 1, 2].map((puff) => (
              <motion.span
                key={puff}
                className="candle-smoke"
                style={{ left: 0 }}
                initial={{ opacity: 0.55, y: 0, x: 0, scale: 0.7 }}
                animate={{ opacity: 0, y: -26 - puff * 8, x: (puff - 1) * 6, scale: 1.7 }}
                transition={{
                  duration: 1.4,
                  delay: 0.1 + puff * 0.16 + index * 0.03,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default function Cake({ lit = true, className = '', width = 'min(74vw, 350px)' }) {
  return (
    <div
      className={`cake relative ${className}`}
      style={{ '--cake-w': width, height: 'calc(var(--cake-w) * 0.98)' }}
      role="img"
      aria-label={
        lit
          ? 'A three tier birthday cake with glowing candles'
          : 'A three tier birthday cake with the candles blown out'
      }
    >
      {/* ── candles ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 z-30"
        style={{
          bottom: 'calc(var(--cake-w) * 0.765)',
          height: 'calc(var(--cake-w) * 0.22)',
        }}
      >
        {CANDLES.map((candle, index) => (
          <Candle key={index} candle={candle} lit={lit} index={index} />
        ))}
      </div>

      {/* ── bottom tier ─────────────────────────────────────────────── */}
      <div
        className="tier absolute left-1/2 -translate-x-1/2"
        style={{
          width: '96%',
          height: 'calc(var(--cake-w) * 0.26)',
          bottom: 'calc(var(--cake-w) * 0.1)',
          background: 'linear-gradient(150deg, #fff3d9 0%, #ffe6ad 48%, #f7cd83 100%)',
          '--top': '#fff6dd',
          '--frost': '#fffaf0',
        }}
      >
        <span className="tier-drips" aria-hidden="true" />
        <span className="tier-shine" aria-hidden="true" />
        <Sprinkles density={1} />
      </div>

      {/* ── middle tier ─────────────────────────────────────────────── */}
      <div
        className="tier absolute left-1/2 z-10 -translate-x-1/2"
        style={{
          width: '76%',
          height: 'calc(var(--cake-w) * 0.23)',
          bottom: 'calc(var(--cake-w) * 0.335)',
          background: 'linear-gradient(150deg, #efe4ff 0%, #d3bdff 48%, #b79cf2 100%)',
          '--top': '#f4ecff',
          '--frost': '#f8f2ff',
        }}
      >
        <span className="tier-drips" aria-hidden="true" />
        <span className="tier-shine" aria-hidden="true" />
        <Sprinkles density={0.8} />
      </div>

      {/* ── top tier ────────────────────────────────────────────────── */}
      <div
        className="tier absolute left-1/2 z-20 -translate-x-1/2"
        style={{
          width: '56%',
          height: 'calc(var(--cake-w) * 0.21)',
          bottom: 'calc(var(--cake-w) * 0.55)',
          background: 'linear-gradient(150deg, #fff0f7 0%, #ffd0e4 48%, #ffa8ca 100%)',
          '--top': '#ffe9f3',
          '--frost': '#fff5fa',
        }}
      >
        <span className="tier-drips" aria-hidden="true" />
        <span className="tier-shine" aria-hidden="true" />
        <Sprinkles density={0.6} />
        <span className="cherry absolute" style={{ left: '12%', top: '34%' }} aria-hidden="true" />
        <span className="cherry absolute" style={{ right: '14%', top: '48%' }} aria-hidden="true" />
      </div>

      {/* ── plate ───────────────────────────────────────────────────── */}
      <div className="cake-plate absolute inset-x-0 bottom-0 z-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-x-[6%] bottom-5 h-8 rounded-[50%] bg-[radial-gradient(ellipse,rgba(88,52,143,0.35),transparent_72%)] blur-md"
      />

      {/* soft candle glow */}
      {lit ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 z-20 h-28 w-52 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(255,214,120,0.55),transparent_70%)] blur-xl"
          style={{ bottom: 'calc(var(--cake-w) * 0.78)' }}
          animate={{ opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : null}
    </div>
  )
}
