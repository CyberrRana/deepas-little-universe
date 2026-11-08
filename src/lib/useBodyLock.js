import { useEffect } from 'react'

/** Locks page scrolling while a modal or lightbox is open. */
export default function useBodyLock(locked) {
  useEffect(() => {
    if (!locked) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}
