import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

// Soft ember light that trails the pointer. Fine pointers only.
export function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 90, damping: 20 })
  const sy = useSpring(y, { stiffness: 90, damping: 20 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen md:block"
      style={{
        x: sx,
        y: sy,
        background: 'radial-gradient(circle, color-mix(in oklab, var(--color-ember-500) 14%, transparent), transparent 65%)',
      }}
    />
  )
}
