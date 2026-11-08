import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Photo from './Photo'
import useBodyLock from '../lib/useBodyLock'

export default function Lightbox({ photos, index, onClose, onSelect }) {
  const isOpen = index !== null && index >= 0
  const closeRef = useRef(null)
  useBodyLock(isOpen)

  const go = useCallback(
    (step) => {
      if (index === null) return
      onSelect((index + step + photos.length) % photos.length)
    },
    [index, onSelect, photos.length]
  )

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(timer)
    }
  }, [isOpen, onClose, go])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-5 bg-[#2c1a45]/72 px-4 py-16 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={photos[index]?.caption ?? 'Photo viewer'}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="clay clay-pink absolute top-5 right-5 grid size-12 place-items-center rounded-full text-ink transition-transform hover:scale-105 active:scale-95 sm:top-8 sm:right-8"
            aria-label="Close photo viewer"
          >
            <X size={20} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              go(-1)
            }}
            className="clay absolute bottom-5 left-4 z-10 grid size-11 place-items-center rounded-full text-ink transition-transform hover:scale-105 active:scale-95 sm:top-1/2 sm:bottom-auto sm:left-8 sm:size-14 sm:-translate-y-1/2"
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              go(1)
            }}
            className="clay absolute right-4 bottom-5 z-10 grid size-11 place-items-center rounded-full text-ink transition-transform hover:scale-105 active:scale-95 sm:top-1/2 sm:right-8 sm:bottom-auto sm:size-14 sm:-translate-y-1/2"
            aria-label="Next photo"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="flex max-h-full flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <Photo
                src={photos[index].src}
                alt={photos[index].alt}
                className="lightbox-image"
                loading="eager"
              />
              <p className="font-script text-2xl text-white drop-shadow-[0_2px_10px_rgba(40,20,70,0.6)] sm:text-3xl">
                {photos[index].caption}
              </p>
              <p className="text-[0.65rem] font-semibold tracking-[0.3em] text-white/45 uppercase">
                {index + 1} / {photos.length} · use arrow keys
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  )
}
