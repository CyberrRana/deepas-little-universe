import { useRef } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Sparkle } from './Decor'

const SPRING = { stiffness: 110, damping: 17, mass: 0.7 }

/* ── a single ribboned face of the box ────────────────────────────────── */
function BoxFace({ name }) {
  const vertical = name === 'front' || name === 'back' || name === 'left' || name === 'right'
  return (
    <div className={`gift-face gift-face--${name}`}>
      {vertical ? (
        <>
          <div className="gift-ribbon gift-ribbon--v" />
          {name === 'front' || name === 'back' ? (
            <div className="gift-ribbon gift-ribbon--h" />
          ) : null}
        </>
      ) : null}
      {name === 'front' ? (
        <span className="gift-heart" aria-hidden="true">
          <Heart size="100%" fill="currentColor" strokeWidth={0} />
        </span>
      ) : null}
    </div>
  )
}

/* ── the shallow, ribbon-topped lid ──────────────────────────────────── */
function Lid({ opened }) {
  return (
    <motion.div
      className="gift-lid-inner"
      initial={false}
      animate={
        opened
          ? { y: -66, x: 22, rotate: -18, rotateX: -22, opacity: 0 }
          : { y: 0, x: 0, rotate: 0, rotateX: 0, opacity: 1 }
      }
      transition={{
        type: 'spring',
        stiffness: 90,
        damping: 14,
        mass: 0.9,
        opacity: { duration: 0.4, delay: 0.3 },
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="gift-lid-face gift-lid-face--front">
        <div className="gift-ribbon gift-ribbon--v" />
      </div>
      <div className="gift-lid-face gift-lid-face--back" />
      <div className="gift-lid-face gift-lid-face--left" />
      <div className="gift-lid-face gift-lid-face--right" />
      <div className="gift-lid-face gift-lid-face--bottom" />
      <div className="gift-lid-face gift-lid-face--top">
        <div className="gift-top-ribbons" aria-hidden="true">
          <i />
          <i />
        </div>
        <div className="gift-bow" aria-hidden="true">
          <div className="gift-bow-loop gift-bow-loop--left" />
          <div className="gift-bow-loop gift-bow-loop--right" />
          <div className="gift-bow-tail gift-bow-tail--left" />
          <div className="gift-bow-tail gift-bow-tail--right" />
          <div className="gift-bow-knot" />
        </div>
      </div>
    </motion.div>
  )
}

export default function GiftBox({ opened, onOpen, stageRef }) {
  const localRef = useRef(null)
  const ref = stageRef ?? localRef

  const baseRotateX = -12
  const baseRotateY = -23
  const rotateX = useSpring(useMotionValue(baseRotateX), SPRING)
  const rotateY = useSpring(useMotionValue(baseRotateY), SPRING)

  const handleMove = (event) => {
    if (event.pointerType !== 'mouse' || opened) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(baseRotateY + px * 24)
    rotateX.set(baseRotateX - py * 18)
  }

  const resetTilt = () => {
    rotateY.set(baseRotateY)
    rotateX.set(baseRotateX)
  }

  return (
    <div
      ref={ref}
      className="gift-stage group"
      onPointerMove={handleMove}
      onPointerLeave={resetTilt}
    >
      {/* warm halo behind the gift */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,rgba(255,239,184,0.75)_0%,rgba(255,196,221,0.45)_42%,rgba(205,185,255,0.18)_62%,transparent_74%)] blur-2xl"
      />

      <div className="gift-float">
        <div className="gift-offset">
          <motion.div className="gift-tilt" style={{ rotateX, rotateY }}>
            <div className="gift-body">
              <BoxFace name="front" />
              <BoxFace name="back" />
              <BoxFace name="left" />
              <BoxFace name="right" />
              <BoxFace name="top" />
              <BoxFace name="bottom" />

              {/* dark, glowing inside revealed when the lid lifts */}
              <motion.div
                className="absolute inset-0 m-auto rounded-[42%]"
                style={{
                  width: 'var(--s)',
                  height: 'var(--s)',
                  transform: 'rotateX(90deg) translateZ(calc(var(--h) / 2 + 2px))',
                  background:
                    'radial-gradient(circle at 50% 50%, #fff8dc 0%, #ffdf9e 30%, #b58bee 58%, #6b45a8 100%)',
                  boxShadow: '0 0 40px 10px rgba(255, 226, 150, 0.65)',
                }}
                initial={false}
                animate={{ opacity: opened ? 1 : 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
              />

              <motion.div
                className="gift-lid"
                animate={{ zIndex: 6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Lid opened={opened} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* rising sparkles once it is open */}
      <AnimatePresence>
        {opened
          ? [0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 text-butter-300"
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: (i - 2.5) * 22,
                  y: [10, -70 - i * 12, -140 - i * 16],
                  scale: [0.4, 1.1, 0.6],
                  rotate: [0, 40, 110],
                }}
                exit={{ opacity: 0, y: -180 }}
                transition={{ duration: 2.2, delay: i * 0.11, ease: 'easeOut' }}
              >
                <Sparkle size={10 + (i % 3) * 5} />
              </motion.div>
            ))
          : null}
      </AnimatePresence>

      {!opened ? (
        <button
          type="button"
          onClick={onOpen}
          className="gift-btn"
          aria-label="Open your birthday surprise"
        />
      ) : null}
    </div>
  )
}
