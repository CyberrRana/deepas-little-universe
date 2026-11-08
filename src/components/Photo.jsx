import { useState } from 'react'
import { resolveAsset } from '../config/site'

/**
 * A photograph that degrades gracefully: if an image URL is missing or blocked,
 * a hand-drawn clay placeholder appears instead of a broken image icon.
 */
export default function Photo({ src, alt, className = '', ...rest }) {
  const [broken, setBroken] = useState(false)
  const resolved = resolveAsset(broken ? 'photos/photo-fallback.svg' : src)

  return (
    <img
      src={resolved}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setBroken(true)}
      {...rest}
    />
  )
}
