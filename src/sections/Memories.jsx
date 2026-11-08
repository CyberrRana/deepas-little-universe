import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Maximize2 } from 'lucide-react'
import Photo from '../components/Photo'
import Lightbox from '../components/Lightbox'
import SectionHeading from '../components/SectionHeading'
import { Balloon, Sparkle, StarField } from '../components/Decor'
import { site } from '../config/site'

/** The gallery is intentionally built around exactly four photographs. */
const photos = site.photos.items.slice(0, 4)

export default function Memories() {
  const [active, setActive] = useState(null)

  return (
    <section id="memories" className="relative isolate overflow-hidden px-5 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="soft-blob top-[10%] -left-24 size-80 bg-lav-200/60" />
        <div className="soft-blob right-[-6%] bottom-[8%] size-72 bg-pink-100/80" />
        <StarField count={8} />
        <Balloon color="lav" size={54} className="absolute top-[18%] right-[3%] hidden md:block" delay={0.9} />
        <Balloon color="peach" size={46} className="absolute bottom-[16%] left-[2%] hidden lg:block" delay={1.7} />
        <Sparkle size={26} className="star-doodle absolute top-[14%] left-[12%] text-pink-300" />
        <Sparkle size={16} className="star-doodle absolute top-[24%] right-[16%] text-butter-300" />
      </div>

      <SectionHeading
        kicker={site.photos.kicker}
        title={site.photos.heading}
        sub={site.photos.sub}
      />

      <div className="relative mx-auto mt-14 max-w-6xl sm:mt-16">
        <motion.div
          className="absolute -top-9 left-1/2 z-20 -translate-x-1/2 -rotate-2 rounded-2xl bg-white/80 px-4 py-1.5 font-script text-lg text-ink-soft shadow-[0_10px_20px_-14px_rgba(88,52,143,0.6)] backdrop-blur sm:left-6 sm:translate-x-0"
          initial={{ opacity: 0, y: -12, rotate: -8 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          our little time capsule
        </motion.div>

        <div className="grid grid-cols-2 items-start gap-x-3 gap-y-7 sm:gap-x-7 sm:gap-y-8 lg:grid-cols-4 lg:gap-x-6">
          {photos.map((photo, index) => (
            <div
              key={photo.src + index}
              className="polaroid-wrap relative"
              style={{ '--off': `${photo.offset ?? 0}px`, zIndex: 10 + index }}
            >
              <motion.button
                type="button"
                onClick={() => setActive(index)}
                className="polaroid group relative block w-full text-left hover:z-40"
                initial={{ opacity: 0, y: 46, rotate: photo.rotate * 1.6, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, rotate: photo.rotate, scale: 1 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.85, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  rotate: 0,
                  y: -14,
                  scale: 1.035,
                  transition: { type: 'spring', stiffness: 220, damping: 18 },
                }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Open photo ${index + 1}: ${photo.caption}`}
              >
                <span className="tape" aria-hidden="true" />

                <span className="polaroid-photo block">
                  <Photo src={photo.src} alt={photo.alt} />
                  <span className="polaroid-gloss" aria-hidden="true" />

                  <span className="absolute top-2.5 left-2.5 rounded-full bg-white/80 px-2 py-0.5 text-[0.55rem] font-bold tracking-[0.16em] text-lav-700 uppercase shadow-sm backdrop-blur">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center pb-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[0.55rem] font-semibold tracking-[0.18em] text-ink uppercase shadow-lg backdrop-blur">
                      <Maximize2 size={10} />
                      tap to open
                    </span>
                  </span>
                </span>

                <span className="flex items-center justify-between gap-2 px-1 pt-2.5 pb-4">
                  <span className="font-script text-[1.15rem] leading-[1.15] text-ink sm:text-[1.3rem]">
                    {photo.caption}
                  </span>
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-pink-100 text-pink-500 sm:size-7">
                    <Heart size={11} fill="currentColor" strokeWidth={0} />
                  </span>
                </span>
              </motion.button>
            </div>
          ))}
        </div>

        <motion.p
          className="mt-12 text-center font-script text-xl text-ink-faint sm:text-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          four photos · endless memories · one very lucky friend
        </motion.p>
      </div>

      <Lightbox
        photos={photos}
        index={active}
        onClose={() => setActive(null)}
        onSelect={setActive}
      />
    </section>
  )
}
