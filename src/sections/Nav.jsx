import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { site } from '../content/site'
import { ease, dur } from '../lib/motion'

export function Wordmark({ className = '' }) {
  return (
    <a href="#top" className={`flex items-center gap-3 font-display text-sm font-semibold tracking-tight ${className}`}>
      <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden>
        <defs>
          <linearGradient id="wm" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#ff5a1f" />
            <stop offset=".55" stopColor="#ffb347" />
            <stop offset="1" stopColor="#3de0ff" />
          </linearGradient>
        </defs>
        <path d="M18 14h30v8H27v8h17v8H27v12h-9z" fill="url(#wm)" />
      </svg>
      <span>
        FARMER<span className="text-ember-500">—</span>FORGE
      </span>
    </a>
  )
}

export function Nav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 200)
    setScrolled(y > 40)
  })

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: dur.base, ease: ease.forge }}
      className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-8"
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-[background,border-color] duration-[var(--dur-base)] ${
          scrolled ? 'glass' : 'border border-transparent'
        }`}
      >
        <Wordmark />
        <ul className="hidden items-center gap-8 lg:flex">
          {site.nav.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="group relative text-sm text-bone-200 transition-colors hover:text-bone-50">
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-heat transition-transform duration-[var(--dur-base)] ease-forge group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <a
          href={site.cta.href}
          className="rounded-full border border-ember-500/60 px-4 py-2 text-xs font-medium tracking-wide text-ember-300 transition-colors hover:bg-ember-500 hover:text-ink-950"
        >
          {site.cta.label}
        </a>
      </nav>
    </motion.header>
  )
}
