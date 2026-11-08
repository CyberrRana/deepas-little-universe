import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import ClayButton from '../components/ClayButton'
import SectionHeading from '../components/SectionHeading'
import { Sparkle, StarField } from '../components/Decor'
import { site } from '../config/site'
import { confetti } from '../lib/confetti'

export default function Letter() {
  const [stage, setStage] = useState('closed')
  const envelopeRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(
    () => () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    },
    []
  )

  const openLetter = () => {
    if (stage !== 'closed') return
    setStage('opening')

    const rect = envelopeRef.current?.getBoundingClientRect()
    if (rect) {
      confetti.burst(rect.left + rect.width / 2, rect.top + rect.height * 0.45, {
        count: 26,
        power: 9,
        spread: 180,
        angle: -90,
        shape: 'star',
        colors: ['#ffe38c', '#ffb3d3', '#cdb9ff', '#fff6d8'],
        gravity: 0.1,
        sizeMin: 4,
        sizeMax: 8,
      })
    }

    timeoutRef.current = window.setTimeout(() => setStage('open'), 620)
  }

  const closeLetter = () => setStage('closed')

  const envelopeVisible = stage === 'closed' || stage === 'opening'

  return (
    <section id="letter" className="relative isolate overflow-hidden px-5 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="soft-blob top-[6%] right-[-4%] size-80 bg-peach-200/50" />
        <div className="soft-blob bottom-[10%] left-[-6%] size-72 bg-lav-200/60" />
        <StarField count={7} />
        <Sparkle size={20} className="star-doodle absolute top-[18%] left-[8%] text-pink-300" />
        <Sparkle size={14} className="star-doodle absolute right-[10%] bottom-[20%] text-lav-300" />
      </div>

      <SectionHeading
        kicker={site.letter.kicker}
        title={site.letter.heading}
        sub={site.letter.sub}
      />

      <div className="relative mx-auto mt-12 max-w-3xl sm:mt-16">
        <div className="clay relative overflow-hidden rounded-[44px] px-4 py-10 sm:px-10 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                'radial-gradient(60% 50% at 15% 0%, rgba(255,226,240,0.8), transparent 65%), radial-gradient(55% 45% at 90% 100%, rgba(226,236,255,0.8), transparent 65%)',
            }}
          />

          <div className="relative grid min-h-[330px] place-items-center sm:min-h-[420px]">
            <AnimatePresence>
              {envelopeVisible ? (
                <motion.div
                  key="envelope-stage"
                  className="flex w-full flex-col items-center gap-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24, scale: 0.94 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative">
                    {/* halo */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-[-18%] rounded-[50%] bg-[radial-gradient(circle,rgba(255,236,180,0.6),rgba(255,196,221,0.35)_45%,transparent_72%)] blur-2xl"
                    />

                    <motion.div
                      ref={envelopeRef}
                      className="envelope relative"
                      animate={
                        stage === 'opening'
                          ? { y: -12, scale: 1.02 }
                          : { y: [0, -6, 0], scale: 1 }
                      }
                      transition={
                        stage === 'opening'
                          ? { duration: 0.6 }
                          : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
                      }
                    >
                      <div className="env-back" />

                      {/* the letter rising out of the envelope while opening */}
                      <motion.div
                        aria-hidden="true"
                        className="absolute right-[8%] left-[8%] top-[8%] h-[70%] rounded-lg bg-[linear-gradient(170deg,#fffdf8,#fff4e6)] shadow-[0_-2px_10px_rgba(90,50,150,0.18)]"
                        initial={{ y: 16, opacity: 0 }}
                        animate={stage === 'opening' ? { y: -70, opacity: 1 } : { y: 16, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                      />

                      <div className="env-front" />

                      <motion.div
                        className="env-flap"
                        initial={false}
                        animate={{ rotateX: stage === 'closed' ? 0 : -172 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: 'top center' }}
                      />

                      <motion.div
                        className="env-seal"
                        initial={false}
                        animate={
                          stage === 'closed'
                            ? { scale: 1, opacity: 1, rotate: 0 }
                            : { scale: 0.2, opacity: 0, rotate: 45 }
                        }
                        transition={{ duration: 0.4 }}
                      >
                        <Heart size={24} fill="#fff4f9" strokeWidth={0} className="drop-shadow-sm" />
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <ClayButton
                      onClick={openLetter}
                      icon={<Sparkles size={17} />}
                      disabled={stage === 'opening'}
                      aria-label="Open your letter"
                    >
                      {site.letter.button}
                    </ClayButton>
                    <p className="text-[0.6rem] font-semibold tracking-[0.24em] text-ink-faint uppercase">
                      sealed with a heart · for you only
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {stage === 'open' ? (
                <motion.div
                  key="letter"
                  className="w-full"
                  initial={{ opacity: 0, y: 50, rotateX: -14, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                  style={{ perspective: 1200 }}
                >
                  <div className="relative mx-auto max-w-[620px]">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-3 top-3 bottom-0 rotate-[1.2deg] rounded-[26px] bg-white/70 shadow-[0_18px_40px_-24px_rgba(88,52,143,0.5)]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-1.5 top-1.5 bottom-0 -rotate-[0.8deg] rounded-[26px] bg-lav-50/80"
                    />

                    <article className="letter-paper relative">
                      <header className="flex items-start justify-between gap-4 border-b border-dashed border-lav-200 pb-4">
                        <div>
                          <p className="text-[0.55rem] font-semibold tracking-[0.3em] text-ink-faint uppercase">
                            birthday mail · no. 01
                          </p>
                          <p className="mt-1 font-script text-2xl text-lav-700">
                            to my favourite person
                          </p>
                        </div>
                        <div className="grid size-12 shrink-0 rotate-3 place-items-center rounded-xl border-2 border-dashed border-pink-300 bg-pink-50 text-pink-500 sm:size-14">
                          <Heart size={20} fill="currentColor" strokeWidth={0} />
                        </div>
                      </header>

                      <p className="mt-6 font-serif text-xl italic text-lav-800">
                        {site.letter.salutation}
                      </p>

                      <h3 className="mt-2 font-serif text-[clamp(1.7rem,5.6vw,2.5rem)] leading-tight font-semibold italic text-lav-800">
                        {site.letter.title}
                      </h3>

                      <div className="mt-5 space-y-4 text-[0.93rem] leading-[1.85] text-ink/85 sm:text-base">
                        {site.letter.paragraphs.map((paragraph, index) => (
                          <p key={index} className={index === 0 ? 'drop-cap' : undefined}>
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      <div className="mt-7 flex items-end justify-between gap-4">
                        <div>
                          <p className="font-serif text-[1.05rem] italic text-ink">
                            {site.letter.closing}
                          </p>
                          <p className="mt-2 font-script text-3xl text-lav-700 sm:text-4xl">
                            {site.letter.signature}
                          </p>
                        </div>
                        <div className="grid size-16 shrink-0 place-items-center rounded-full bg-[linear-gradient(155deg,#ffb9d5,#f77bab_52%,#d94f8b)] shadow-[inset_0_3px_3px_rgba(255,255,255,0.7),inset_0_-8px_12px_-6px_rgba(140,24,74,0.6),0_10px_18px_-8px_rgba(140,24,74,0.55)]">
                          <Heart size={22} fill="#fff4f9" strokeWidth={0} />
                        </div>
                      </div>

                      <div
                        aria-hidden="true"
                        className="mt-6 flex items-center justify-center gap-2 text-pink-300"
                      >
                        <span className="h-px w-10 bg-pink-200" />
                        <Sparkle size={12} />
                        <span className="h-px w-10 bg-pink-200" />
                      </div>
                    </article>

                    <div className="mt-6 flex justify-center">
                      <ClayButton variant="ghost" onClick={closeLetter}>
                        {site.letter.closeButton}
                      </ClayButton>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
