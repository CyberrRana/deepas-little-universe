import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, Gift, Heart, Sparkles } from 'lucide-react'
import GiftBox from '../components/GiftBox'
import ClayButton from '../components/ClayButton'
import { Balloon, ClayCloud, RibbonDoodle, Sparkle, StarField } from '../components/Decor'
import { site } from '../config/site'
import { confetti } from '../lib/confetti'

const letter = {
  hidden: { opacity: 0, y: 34, rotate: -6 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { delay: 0.18 + i * 0.038, type: 'spring', stiffness: 220, damping: 16 },
  }),
}

export default function Hero({ opened, onOpen }) {
  const giftRef = useRef(null)

  const handleOpen = () => {
    if (opened) return
    const rect = giftRef.current?.getBoundingClientRect()
    onOpen()
    confetti.celebrate(
      rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height * 0.42 }
        : undefined
    )
    confetti.rain(46)
  }

  const goToMemories = () => {
    document.getElementById('memories')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="surprise"
      className="relative isolate flex min-h-[100svh] flex-col items-center overflow-hidden px-5 pt-14 pb-10 sm:pt-16"
    >
      {/* ── ambient decorations ─────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="soft-blob top-[8%] left-[6%] size-64 bg-pink-200/70" />
        <div className="soft-blob top-[34%] right-[4%] size-72 bg-lav-200/70" />
        <div className="soft-blob bottom-[6%] left-[26%] size-72 bg-butter-200/60" />

        <ClayCloud width={215} className="absolute top-[13%] left-[-3%] opacity-90 sm:left-[2%]" delay={0.4} />
        <ClayCloud width={165} className="absolute top-[9%] right-[0%] opacity-80 sm:right-[4%]" flip delay={1.2} />

        <Balloon color="pink" size={86} className="absolute top-[16%] left-[1%] sm:left-[5%]" delay={0.2} />
        <Balloon color="blue" size={66} className="absolute top-[9%] right-[11%] hidden sm:block" delay={1.1} />
        <Balloon color="butter" size={58} className="absolute top-[46%] right-[1%] hidden md:block" delay={0.7} />
        <Balloon color="peach" size={74} className="absolute bottom-[20%] left-[2%] hidden md:block" delay={1.6} />
        <Balloon color="lav" size={54} className="absolute top-[34%] left-[10%] hidden lg:block" delay={2.1} />

        <RibbonDoodle width={230} className="absolute -left-10 bottom-[12%] rotate-12 opacity-70" />
        <RibbonDoodle width={190} className="absolute -right-8 top-[52%] -rotate-12 opacity-50" />

        <StarField count={9} />
        <Sparkle size={22} className="star-doodle animate-twinkle absolute top-[24%] left-[22%] text-butter-300" />
        <Sparkle size={15} className="star-doodle animate-twinkle absolute top-[15%] right-[28%] text-pink-300" style={{ animationDelay: '0.9s' }} />
        <Sparkle size={18} className="star-doodle animate-twinkle absolute bottom-[26%] right-[18%] text-lav-300" style={{ animationDelay: '1.6s' }} />
        <Sparkle size={12} className="star-doodle animate-twinkle absolute top-[58%] left-[6%] text-blue-300" style={{ animationDelay: '0.4s' }} />
      </div>

      {/* ── tiny top identity bar ───────────────────────────────────── */}
      <motion.div
        className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 sm:px-8"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <span className="pill !text-[0.6rem] !tracking-[0.2em]">
          <Sparkles size={12} className="text-pink-500" />
          {site.title}
        </span>
        <span className="pill hidden !text-[0.6rem] sm:inline-flex">
          <Heart size={11} className="text-pink-500" fill="currentColor" />
          est. forever
        </span>
      </motion.div>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        <motion.p
          className="eyebrow justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <Sparkle size={11} className="text-butter-300" />
          {site.hero.kicker}
          <Sparkle size={11} className="text-pink-300" />
        </motion.p>

        <h1 className="text-3d mt-4 flex flex-wrap justify-center text-[clamp(2.7rem,10.5vw,6.6rem)] leading-[0.92]">
          <span className="sr-only">{site.hero.greeting}</span>
          {site.hero.greeting.split('').map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              aria-hidden="true"
              className="inline-block"
              custom={index}
              variants={letter}
              initial="hidden"
              animate="show"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        <div className="mt-5 flex min-h-[30px] w-full max-w-lg justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {!opened ? (
              <motion.p
                key="subtitle"
                className="max-w-md text-[0.98rem] font-light text-ink-soft sm:text-lg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.8, delay: 0.75 }}
              >
                {site.hero.subtitle}
              </motion.p>
            ) : (
              <motion.div
                key="reveal"
                className="clay w-full max-w-md rounded-[26px] px-5 py-3.5"
                initial={{ opacity: 0, y: 18, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              >
                <p className="font-display text-[0.98rem] leading-tight text-ink sm:text-[1.12rem]">
                  {site.hero.surprise}
                </p>
                <p className="mt-1.5 text-[0.7rem] leading-relaxed text-ink-soft sm:text-xs">
                  {site.hero.surpriseSub}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="relative mt-1 mb-6 flex flex-col items-center sm:mt-2"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <GiftBox opened={opened} onOpen={handleOpen} stageRef={giftRef} />
        </motion.div>

        <motion.div
          className="relative z-20 mt-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          <h2 className="text-3d text-3d--pink mx-auto flex flex-wrap justify-center text-[clamp(1.7rem,6.2vw,3.2rem)] leading-none tracking-[0.02em]">
            {site.hero.bigText}
          </h2>
          <Sparkle
            size={26}
            className="absolute -top-2 left-[8%] hidden text-butter-300 sm:block"
          />
          <Sparkle
            size={18}
            className="absolute right-[10%] bottom-0 hidden text-lav-300 sm:block"
          />
        </motion.div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <ClayButton
            onClick={opened ? goToMemories : handleOpen}
            icon={opened ? <ArrowDown size={17} /> : <Gift size={17} />}
            aria-label={opened ? 'Scroll to your memories' : 'Open your birthday surprise'}
          >
            {opened ? site.hero.ctaOpened : site.hero.cta}
          </ClayButton>
        </div>

        <motion.div
          className="mt-6 flex flex-col items-center gap-2 text-[0.6rem] font-semibold tracking-[0.26em] text-ink-faint uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <span>{site.hero.scrollCue}</span>
          <span className="scroll-line" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  )
}
