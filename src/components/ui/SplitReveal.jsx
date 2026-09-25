import { motion } from 'motion/react'
import { ease, dur, stagger } from '../../lib/motion'

// Word-by-word masked rise. The one text-entrance pattern on the site.
// `as` sets the wrapper element; `delay` offsets the whole group.
export function SplitReveal({ text, as: Tag = 'span', className = '', wordClassName = '', delay = 0, inView = true }) {
  const words = text.split(' ')
  const trigger = inView
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } }
    : { initial: 'hidden', animate: 'show' }

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        variants={{ show: { transition: { staggerChildren: stagger.words, delayChildren: delay } } }}
        {...trigger}
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
