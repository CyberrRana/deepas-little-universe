import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, RotateCcw, Sparkles } from 'lucide-react'
import Cake from '../components/Cake'
import ClayButton from '../components/ClayButton'
import { Balloon, Sparkle } from '../components/Decor'
import { site } from '../config/site'
import { confetti } from '../lib/confetti'

export default function Finale({ onReplay }) {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return undefined
    let timer
    let cancelled = false

    const launch = () => {
      if (cancelled) return
      const x = window.innerWidth * (0.16 + Math.random() * 0.68)
      const y = window.innerHeight * (0.12 + Math.random() * 0.4)
      confetti.firework(x, y)
      timer = window.setTimeout(launch, 1500 + Math.random() * 1600)
    }

    timer = window.setTimeout(launch, 500)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [inView])

  return (
    <section
      ref={sectionRef}
      id="finale"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden rounded-t-[38px] px-5 py-24 text-center sm:rounded-t-[56px]"
      style={{
        background:
          'radial-gradient(70% 50% at 50% -6%, rgba(146,104,214,0.85) 0%, transparent 62%), radial-gradient(45% 35% at 12% 26%, rgba(255,143,192,0.35), transparent 65%), radial-gradient(50% 40% at 90% 72%, rgba(120,197,246,0.28), transparent 68%), linear-gradient(168deg, #251540 0%, #35205a 38%, #4a2c74 66%, #6b438c 100%)',
      }}
    >
      {/* ── night sky decoration ────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,236,180,0.28),transparent_68%)] blur-2xl" />
        <div className="absolute inset-0 opacity-70">
          {Array.from({ length: 26 }).map((_, index) => {
            const left = (index * 37.7) % 100
            const top = (index * 61.3) % 88
            return (
              <Sparkle
                key={index}
                size={6 + ((index * 5) % 10)}
                className="absolute animate-twinkle text-white"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  opacity: 0.35 + ((index % 4) * 0.15),
                  animationDelay: `${(index % 7) * 0.5}s`,
                }}
              />
            )
          })}
        </div>

        <Balloon color="pink" size={72} className="absolute top-[14%] left-[2%] hidden opacity-90 sm:left-[6%] sm:block" delay={0.3} />
        <Balloon color="lav" size={58} className="absolute top-[8%] right-[4%] hidden sm:block" delay={1.2} />
        <Balloon color="butter" size={44} className="absolute top-[42%] left-[1%] hidden md:block" delay={0.8} />
        <Balloon color="blue" size={52} className="absolute bottom-[16%] right-[3%] hidden md:block" delay={1.7} />
        <Balloon color="peach" size={38} className="absolute bottom-[22%] left-[8%] hidden lg:block" delay={2.2} />
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        <motion.p
          className="eyebrow justify-center text-lav-200"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Sparkles size={12} className="text-butter-300" />
          {site.finale.kicker}
          <Sparkles size={12} className="text-pink-300" />
        </motion.p>

        <motion.h2
          className="text-3d mt-5 max-w-3xl text-[clamp(2rem,6.4vw,4.1rem)] leading-[0.98] text-white"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.finale.heading}
        </motion.h2>

        <motion.p
          className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {site.finale.message}
        </motion.p>

        <motion.div
          className="mt-8 sm:mt-10"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Cake width="min(60vw, 290px)" />
        </motion.div>

        <motion.h3
          className="text-3d text-3d--pink mt-8 text-[clamp(1.6rem,6.4vw,3.6rem)] leading-none"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {site.finale.bigText}
        </motion.h3>

        <div className="mt-8">
          <ClayButton
            onClick={onReplay}
            variant="butter"
            icon={<RotateCcw size={17} />}
            aria-label="Replay the whole birthday surprise"
          >
            {site.finale.button}
          </ClayButton>
        </div>

        <p className="mt-8 flex items-center gap-2 text-[0.6rem] font-semibold tracking-[0.24em] text-white/40 uppercase">
          <Heart size={10} fill="currentColor" />
          {site.finale.footnote}
        </p>
      </div>
    </section>
  )
}
