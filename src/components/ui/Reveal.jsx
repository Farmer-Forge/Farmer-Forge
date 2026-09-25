import { motion } from 'motion/react'
import { ease, dur } from '../../lib/motion'

// Generic block entrance: fade + rise + un-blur. Use for anything that isn't a headline.
export function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: dur.slow, ease: ease.forge, delay }}
    >
      {children}
    </Comp>
  )
}
