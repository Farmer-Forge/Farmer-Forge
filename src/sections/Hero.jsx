import { lazy, Suspense, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { site } from '../content/site'
import { SplitReveal } from '../components/ui/SplitReveal'
import { Button } from '../components/ui/Button'
import { StaticHero } from '../components/ui/StaticHero'
import { ease, dur } from '../lib/motion'

const HeroScene = lazy(() => import('../components/three/HeroScene'))
const PHONE = '(max-width: 767px)'

export function Hero() {
  const { hero } = site
  // Phones get the card's sphere as SVG and never download three.js.
  const [phone] = useState(() => window.matchMedia(PHONE).matches)
  const { scrollY } = useScroll()
  const fade = useTransform(scrollY, [0, 600], [1, 0])
  const lift = useTransform(scrollY, [0, 600], [0, -120])
  const sceneScale = useTransform(scrollY, [0, 800], [1, 1.15])

  return (
    <section id="top" className="relative flex min-h-svh items-end overflow-hidden pb-16 pt-32 md:items-center md:pb-0">
      <motion.div className="absolute inset-0" style={{ scale: sceneScale }}>
        {phone ? (
          <StaticHero />
        ) : (
          <Suspense fallback={<div className="absolute inset-0 bg-ink-950" />}>
            <HeroScene />
          </Suspense>
        )}
      </motion.div>

      {/* scrim so copy always reads on top of the shader */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent md:bg-gradient-to-r md:from-ink-950/75 md:via-ink-950/10" />

      <motion.div style={{ opacity: fade, y: lift }} className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <motion.p
          className="eyebrow mb-8 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: dur.slow, ease: ease.forge, delay: 0.2 }}
        >
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-ember-500" style={{ animation: 'pulse-ring 1.8s var(--ease-forge) infinite' }} />
            <span className="relative h-2 w-2 rounded-full bg-ember-500" />
          </span>
          {hero.eyebrow}
        </motion.p>

        <h1 className="display-xl max-w-4xl" aria-label={hero.lines.join(' ')}>
          {hero.lines.map((line, i) => (
            <SplitReveal
              key={line}
              text={line}
              animate
              delay={0.35 + i * 0.14}
              className="block"
              wordClassName={i === hero.heatLine ? 'text-heat' : ''}
            />
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-bone-200 md:text-lg"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: dur.slow, ease: ease.forge, delay: 1.0 }}
        >
          {hero.body}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.slow, ease: ease.forge, delay: 1.2 }}
        >
          <Button href={site.cta.href}>{site.cta.label}</Button>
          <Button href={hero.secondary.href} variant="ghost">
            {hero.secondary.label}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        style={{ opacity: fade }}
        className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 md:right-10 md:flex"
      >
        <span className="eyebrow">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-bone-600/40">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-heat"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, ease: ease.molten, repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  )
}
