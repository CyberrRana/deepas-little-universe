import { useEffect, useRef } from 'react'
import { confetti } from '../lib/confetti'

export default function ConfettiCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return undefined
    return confetti.attach(canvasRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90]"
    />
  )
}
