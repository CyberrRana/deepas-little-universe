import { useCallback, useEffect, useState } from 'react'
import ConfettiCanvas from './components/ConfettiCanvas'
import NavDots from './components/NavDots'
import ScrollProgress from './components/ScrollProgress'
import Hero from './sections/Hero'
import Memories from './sections/Memories'
import Letter from './sections/Letter'
import Playground from './sections/Playground'
import Finale from './sections/Finale'
import { site } from './config/site'
import { confetti } from './lib/confetti'

export default function App() {
  const [opened, setOpened] = useState(false)
  const [magicKey, setMagicKey] = useState(0)
  const [active, setActive] = useState(site.nav[0].id)

  useEffect(() => {
    const elements = site.nav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)

    if (!elements.length || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const navigate = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const replay = useCallback(() => {
    confetti.clear()
    setOpened(false)
    setMagicKey((key) => key + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.setTimeout(() => confetti.rain(40), 850)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="aurora" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <ScrollProgress />
      <ConfettiCanvas />
      <NavDots sections={site.nav} active={active} onNavigate={navigate} />

      <a
        href="#memories"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[130] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg"
      >
        Skip to the memories
      </a>

      <main key={magicKey}>
        <Hero opened={opened} onOpen={() => setOpened(true)} />
        <Memories />
        <Letter />
        <Playground />
        <Finale onReplay={replay} />
      </main>
    </div>
  )
}
