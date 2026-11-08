import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CakeSlice, Shuffle, Sparkles, WandSparkles } from 'lucide-react'
import Cake from '../components/Cake'
import ClayButton from '../components/ClayButton'
import SectionHeading from '../components/SectionHeading'
import { Balloon, Sparkle, StarField } from '../components/Decor'
import { site } from '../config/site'
import { confetti } from '../lib/confetti'

const BALLOON_HEX = {
  pink: ['#ffd6e7', '#ff9cc4', '#f05f9c'],
  lav: ['#e6d9ff', '#b9a0f7', '#8a68e0'],
  blue: ['#dcf0ff', '#a9d8fb', '#6fb6ef'],
  yellow: ['#fff6cf', '#ffe58f', '#f7c948'],
  peach: ['#ffeadb', '#ffc3a1', '#f5976d'],
  mint: ['#e2fbf1', '#b5ecd7', '#7fd4b4'],
}

const SPOTS = [
  { left: '-2%', top: '21%', size: 46, delay: 0.2 },
  { left: '87%', top: '17%', size: 52, delay: 1.1 },
  { left: '89%', top: '60%', size: 40, delay: 0.6 },
  { left: '0%', top: '63%', size: 40, delay: 1.6 },
  { left: '9%', top: '40%', size: 32, delay: 2.1 },
  { left: '79%', top: '42%', size: 30, delay: 0.9 },
]

const pop = (n) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(n)
}

export default function Playground() {
  const [wished, setWished] = useState(false)
  const [popped, setPopped] = useState(0)
  const [toast, setToast] = useState(null)
  const [surprise, setSurprise] = useState(0)
  const [balloons, setBalloons] = useState(() =>
    site.playground.balloons.slice(0, SPOTS.length).map((balloon, index) => ({
      ...balloon,
      id: index,
      popped: false,
    }))
  )

  const cakeRef = useRef(null)
  const timers = useRef([])
  const toastTimer = useRef(null)

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer))
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
    },
    []
  )

  const burstFrom = (element, colors) => {
    if (!element) return
    const rect = element.getBoundingClientRect()
    confetti.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, {
      count: 34,
      power: 11,
      spread: 360,
      colors,
      gravity: 0.2,
    })
  }

  const makeWish = () => {
    if (wished) {
      setWished(false)
      return
    }
    setWished(true)
    pop(24)
    const rect = cakeRef.current?.getBoundingClientRect()
    confetti.celebrate(
      rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height * 0.45 } : undefined
    )
    confetti.rain(26)
  }

  const popBalloon = (balloon, element) => {
    if (balloon.popped) return
    burstFrom(element, BALLOON_HEX[balloon.color] ?? BALLOON_HEX.pink)
    pop(12)
    setPopped((count) => count + 1)
    setBalloons((list) =>
      list.map((item) => (item.id === balloon.id ? { ...item, popped: true } : item))
    )

    setToast(balloon.note)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 3400)

    timers.current.push(
      window.setTimeout(() => {
        setBalloons((list) =>
          list.map((item) => {
            if (item.id !== balloon.id) return item
            const colors = ['pink', 'lav', 'blue', 'yellow', 'peach', 'mint']
            return { ...item, popped: false, color: colors[Math.floor(Math.random() * colors.length)] }
          })
        )
      }, 1700)
    )
  }

  const nextSurprise = () => {
    setSurprise((index) => (index + 1) % site.playground.surprises.length)
    pop(8)
    confetti.burst(window.innerWidth / 2, window.innerHeight * 0.6, {
      count: 18,
      power: 8,
      spread: 120,
      angle: -90,
      shape: 'star',
      colors: ['#ffe38c', '#ffb3d3', '#cdb9ff'],
      gravity: 0.08,
    })
  }

  return (
    <section id="playground" className="relative isolate overflow-hidden px-5 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="soft-blob top-[4%] left-[10%] size-72 bg-blue-200/60" />
        <div className="soft-blob right-[6%] bottom-[6%] size-80 bg-pink-200/60" />
        <StarField count={8} />
        <Balloon color="mint" size={48} className="absolute top-[10%] right-[2%] hidden lg:block" delay={0.5} />
        <Sparkle size={22} className="star-doodle absolute top-[16%] left-[6%] text-butter-300" />
        <Sparkle size={15} className="star-doodle absolute right-[8%] bottom-[14%] text-lav-300" />
      </div>

      <SectionHeading
        kicker={site.playground.kicker}
        title={site.playground.heading}
        sub={site.playground.sub}
      />

      <div className="mx-auto mt-14 grid max-w-6xl items-stretch gap-5 sm:mt-16 lg:grid-cols-[1.4fr_1fr]">
        {/* ── the cake stage ─────────────────────────────────────────── */}
        <div className="clay relative overflow-hidden rounded-[44px] px-4 pt-8 pb-7 sm:px-8 sm:pt-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(70% 55% at 50% 8%, rgba(255,244,214,0.85), transparent 70%), radial-gradient(60% 50% at 80% 100%, rgba(255,214,236,0.7), transparent 70%)',
            }}
          />

          <div className="relative flex items-center justify-between">
            <p className="eyebrow">
              <CakeSlice size={12} />
              the wish station
            </p>
            <p className="hidden text-[0.6rem] font-semibold tracking-[0.18em] text-ink-faint uppercase sm:block">
              {site.playground.balloonsTitle}
            </p>
          </div>

          {/* interactive floating balloons */}
          <div className="pointer-events-none absolute inset-0">
            <AnimatePresence>
              {balloons.map((balloon, index) => {
                const spot = SPOTS[index]
                if (!spot) return null
                return balloon.popped ? null : (
                  <motion.div
                    key={`${balloon.id}-${balloon.color}`}
                    className="pointer-events-auto absolute z-20"
                    style={{ left: spot.left, top: spot.top }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.5, y: -18, transition: { duration: 0.3 } }}
                    transition={{ type: 'spring', stiffness: 180, damping: 16 }}
                  >
                    <button
                      type="button"
                      onClick={(event) => popBalloon(balloon, event.currentTarget)}
                      className="group relative block cursor-pointer rounded-full transition-transform duration-300 hover:scale-110 active:scale-95"
                      aria-label="Pop this balloon for a birthday wish"
                    >
                      <span
                        className={`balloon balloon--${balloon.color} animate-float-y block`}
                        style={{ '--bw': `${spot.size}px`, animationDelay: `${spot.delay}s` }}
                      >
                        <svg className="balloon-string" viewBox="0 0 34 64" fill="none" aria-hidden="true">
                          <path
                            d="M17 0c-7 12 8 18 2 30-5 10 3 16-1 24-2 4 0 8 0 10"
                            stroke="#b8a6cf"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {toast ? (
              <motion.div
                key={toast}
                className="absolute inset-x-6 top-16 z-30 mx-auto max-w-xs"
                initial={{ opacity: 0, y: -10, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              >
                <p className="rounded-2xl bg-white/85 px-4 py-2.5 text-center text-xs leading-relaxed font-medium text-ink shadow-[0_16px_30px_-18px_rgba(88,52,143,0.65)] backdrop-blur">
                  {toast}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div ref={cakeRef} className="relative z-10 mt-6 flex justify-center sm:mt-4">
            <motion.div
              animate={wished ? { scale: [1, 1.015, 1] } : { scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Cake lit={!wished} />
            </motion.div>
          </div>

          <div className="relative z-10 mt-4 flex flex-col items-center gap-3">
            <ClayButton
              onClick={makeWish}
              variant={wished ? 'ghost' : 'default'}
              icon={wished ? <Sparkles size={17} /> : <WandSparkles size={17} />}
              aria-label={wished ? 'Relight the birthday candles' : 'Make a birthday wish'}
            >
              {wished ? site.playground.wishAgain : site.playground.wishButton}
            </ClayButton>
            <p className="text-[0.58rem] font-semibold tracking-[0.22em] text-ink-faint uppercase">
              no rules · just magic
            </p>
          </div>

          <AnimatePresence>
            {wished ? (
              <motion.div
                key="wish"
                className="relative z-10 mt-5 rounded-3xl border border-white/80 bg-white/70 px-5 py-4 text-center shadow-[0_18px_40px_-28px_rgba(88,52,143,0.7)] backdrop-blur"
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 180, damping: 20 }}
              >
                <p className="font-display text-lg text-ink">{site.playground.wishTitle}</p>
                <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-ink-soft sm:text-sm">
                  {site.playground.wishText}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* ── side panel ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          <div className="clay clay-lav relative overflow-hidden rounded-[36px] px-6 py-7 text-center">
            <Sparkle size={26} className="absolute top-4 right-5 text-white/70" />
            <p className="text-[0.6rem] font-bold tracking-[0.28em] text-lav-800/70 uppercase">
              magic meter
            </p>
            <p className="mt-2 font-display text-[2.6rem] leading-none text-lav-800">
              {String(popped).padStart(2, '0')}
            </p>
            <p className="mt-1 text-xs font-semibold tracking-[0.16em] text-lav-800/70 uppercase">
              {site.playground.popped}
            </p>
            <div className="mt-4 flex justify-center gap-1.5">
              {Array.from({ length: 6 }).map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index < popped % 6 || popped >= 6
                      ? 'w-7 bg-gradient-to-r from-pink-400 to-butter-300'
                      : 'w-4 bg-white/70'
                  }`}
                />
              ))}
            </div>
            <p className="mt-4 font-script text-lg text-lav-800/80">
              every pop = one tiny wish
            </p>
          </div>

          <div className="clay relative flex flex-1 flex-col overflow-hidden rounded-[36px] px-6 py-7">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 right-4 font-serif text-[7rem] leading-none text-lav-200/60 select-none"
            >
              &rdquo;
            </span>
            <p className="eyebrow relative">
              <Sparkles size={12} className="text-pink-500" />
              surprise machine
            </p>

            <div className="mt-4 flex-1">
              <AnimatePresence mode="wait">
                <motion.p
                  key={surprise}
                  className="font-display text-[1.25rem] leading-[1.25] text-ink sm:text-[1.4rem]"
                  initial={{ opacity: 0, y: 14, rotate: -1 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -12, rotate: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {site.playground.surprises[surprise]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <ClayButton
                variant="butter"
                onClick={nextSurprise}
                icon={<Shuffle size={15} />}
                className="!px-5 !py-3.5 !text-[0.72rem]"
              >
                {site.playground.shuffleButton}
              </ClayButton>
              <span className="text-[0.6rem] font-semibold tracking-[0.18em] text-ink-faint uppercase">
                {surprise + 1}/{site.playground.surprises.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
