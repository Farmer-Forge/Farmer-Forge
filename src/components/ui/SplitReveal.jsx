import { motion } from 'motion/react'
import { ease, dur, stagger } from '../../lib/motion'

// Word-by-word masked rise. Only the hero animates (`animate`); every other headline renders static.
export function SplitReveal({ text, as: Tag = 'span', className = '', wordClassName = '', delay = 0, animate = false }) {
  if (!animate) {
    return (
      <Tag className={className}>
        <span className={wordClassName}>{text}</span>
      </Tag>
    )
  }

  const words = text.split(' ')
  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        variants={{ show: { transition: { staggerChildren: stagger.words, delayChildren: delay } } }}
        initial="hidden"
        animate="show"
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={`inline-block ${wordClassName}`}
              variants={{
                hidden: { y: '110%', rotate: 4 },
                show: { y: '0%', rotate: 0, transition: { duration: dur.slow, ease: ease.forge } },
              }}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
