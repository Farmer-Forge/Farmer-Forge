import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { site } from '../content/site'

// Scroll-scrubbed statement: each word heats up from ash to bone as it passes through the viewport.
function Word({ children, progress, range }) {
  const color = useTransform(progress, [range[0], range[1], Math.min(range[1] + 0.08, 1)], ['#a2a4ab', '#ffb347', '#f4f1ea'])
  return (
    <motion.span style={{ color }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  )
}

export function Principles() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 45%'] })
  const words = site.principles.statement.split(' ')

  return (
    <section id="principles" ref={ref} className="relative mx-auto max-w-7xl px-6 py-40 md:px-10 md:py-56">
      <p className="display-lg" aria-label={site.principles.statement}>
        <span aria-hidden>
          {words.map((w, i) => {
            const start = i / words.length
            return (
              <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
                {w}
              </Word>
            )
          })}
        </span>
      </p>
    </section>
  )
}
