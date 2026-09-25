import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { MoltenField } from './MoltenField'
import { ForgedCore } from './ForgedCore'

// Owns the WebGL canvas. Stops rendering entirely when scrolled out of view,
// and renders a single still frame for reduced-motion users.
export default function HeroScene() {
  const wrap = useRef(null)
  const [visible, setVisible] = useState(true)
  const [still] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 })
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 40 }}
        frameloop={still ? 'demand' : visible ? 'always' : 'never'}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <MoltenField still={still} />
        <ambientLight intensity={0.25} />
        <pointLight position={[4, 3, 4]} intensity={90} color="#ff5a1f" />
        <pointLight position={[-3, -2, 3]} intensity={55} color="#3de0ff" />
        <pointLight position={[0, 4, -3]} intensity={25} color="#ffb347" />
        <ForgedCore still={still} />
      </Canvas>
    </div>
  )
}
