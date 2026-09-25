import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

// Two variants only: "heat" (the one main action) and "ghost" (everything else).
// Both are magnetic: they lean toward the cursor on hover.
export function Button({ href, children, variant = 'heat', className = '', ...rest }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const base =
    'group relative inline-flex items-center gap-3 rounded-full px-7 py-4 font-medium text-sm tracking-wide transition-colors duration-[var(--dur-quick)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plasma-300'
  const variants = {
    heat: 'bg-heat text-ink-950 shadow-[0_0_40px_-8px_var(--color-ember-500)]',
    ghost: 'glass text-bone-50 hover:text-ember-300',
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="relative z-10 inline-block transition-transform duration-[var(--dur-base)] ease-forge group-hover:translate-x-1 group-hover:-translate-y-0.5"
      >
        ↗
      </span>
    </motion.a>
  )
}
