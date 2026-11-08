import { motion } from 'framer-motion'
import { Sparkle } from './Decor'

export default function SectionHeading({ kicker, title, sub, className = '', light = false }) {
  return (
    <div className={`relative mx-auto max-w-3xl text-center ${className}`}>
      {kicker ? (
        <motion.p
          className={`eyebrow justify-center ${light ? 'text-lav-100' : ''}`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Sparkle size={11} className={light ? 'text-pink-200' : 'text-pink-400'} />
          {kicker}
          <Sparkle size={11} className={light ? 'text-pink-200' : 'text-pink-400'} />
        </motion.p>
      ) : null}

      <motion.h2
        className={`mt-5 text-[clamp(1.85rem,5.4vw,3.5rem)] ${light ? 'text-3d text-white' : ''}`}
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        {light ? title : <span className="text-grad-soft">{title}</span>}
      </motion.h2>

      {sub ? (
        <motion.p
          className={`mx-auto mt-5 max-w-xl text-[0.98rem] leading-relaxed text-balance sm:text-base ${
            light ? 'text-white/75' : 'text-ink-soft'
          }`}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {sub}
        </motion.p>
      ) : null}
    </div>
  )
}
