import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { site } from '../content/site'
import { SplitReveal } from '../components/ui/SplitReveal'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'

export function Contact() {
  const { contact, email } = site
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const orb = useTransform(scrollYProgress, [0, 1], [0.4, 1.1])
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 0.9])

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden px-6 py-40 md:px-10 md:py-56">
      <motion.div
        aria-hidden
        style={{ scale: orb, opacity: glow }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div
          className="h-full w-full rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 50% 60%, var(--color-ember-300) 0%, var(--color-ember-500) 25%, var(--color-ember-700) 45%, transparent 70%)',
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl text-center">
        <Reveal>
          <p className="eyebrow mb-8">{contact.eyebrow}</p>
        </Reveal>
        <h2 className="display-xl" aria-label={contact.lines.join(' ')}>
          {contact.lines.map((l, i) => (
            <SplitReveal key={l} text={l} className="block" delay={i * 0.12} />
          ))}
        </h2>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-lg text-lg text-bone-200">{contact.body}</p>
        </Reveal>
        <Reveal delay={0.45} className="mt-12 flex flex-col items-center gap-6">
          <Button href={`mailto:${email}`}>{contact.cta}</Button>
          <a href={`mailto:${email}`} className="font-mono text-sm text-bone-200 underline-offset-8 transition-colors hover:text-ember-300 hover:underline">
            {email}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
