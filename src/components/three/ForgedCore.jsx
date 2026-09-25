import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

// Fresnel halo: additive shell that glows at grazing angles, ember fading to plasma.
const halo = {
  vertexShader: /* glsl */ `
    varying vec3 vN; varying vec3 vV;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vN = normalize(normalMatrix * normal);
      vV = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: /* glsl */ `
    varying vec3 vN; varying vec3 vV;
    void main() {
      float f = pow(1.0 - abs(dot(vN, vV)), 2.6);
      vec3 col = mix(vec3(1.0, 0.353, 0.122), vec3(0.239, 0.878, 1.0), smoothstep(-0.2, 0.9, vN.y));
      gl_FragColor = vec4(col * f * 1.4, f);
    }`,
}

// The centerpiece: a molten, slowly deforming core inside a rotating wireframe cage,
// with embers drifting up around it. Leans toward the cursor.
export function ForgedCore({ still = false }) {
  const group = useRef()
  const cage = useRef()
  const { viewport } = useThree()
  const wide = viewport.aspect > 1.1
  const scale = wide ? Math.min(viewport.height * 0.17, viewport.width * 0.1, 1.2) : viewport.width * 0.2

  useFrame((state, delta) => {
    if (!group.current || still) return
    const { x, y } = state.pointer
    group.current.rotation.y += (x * 0.5 - group.current.rotation.y) * 0.04
    group.current.rotation.x += (-y * 0.3 - group.current.rotation.x) * 0.04
    cage.current.rotation.y += delta * 0.12
    cage.current.rotation.z += delta * 0.05
  })

  return (
    <group position={[wide ? viewport.width * 0.3 : 0, wide ? 0.1 : viewport.height * 0.3, 0]} scale={scale}>
      <group ref={group}>
        <Float speed={still ? 0 : 1.4} rotationIntensity={0.4} floatIntensity={0.6}>
          <mesh>
            <icosahedronGeometry args={[1, 32]} />
            <MeshDistortMaterial
              color="#2a303d"
              emissive="#c2360b"
              emissiveIntensity={0.18}
              metalness={0.35}
              roughness={0.22}
              clearcoat={1}
              clearcoatRoughness={0.1}
              distort={0.38}
              speed={still ? 0 : 1.6}
            />
          </mesh>
          <mesh scale={1.22}>
            <sphereGeometry args={[1, 64, 64]} />
            <shaderMaterial {...halo} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh ref={cage} scale={1.42}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial color="#3de0ff" wireframe transparent opacity={0.22} />
          </mesh>
          <mesh scale={1.9} rotation={[Math.PI / 2.3, 0, 0]}>
            <torusGeometry args={[1, 0.004, 8, 160]} />
            <meshBasicMaterial color="#ffb347" transparent opacity={0.5} />
          </mesh>
        </Float>
      </group>
      <Sparkles count={wide ? 70 : 36} scale={[4, 4, 3]} size={2.4} speed={still ? 0 : 0.5} color="#ffb347" opacity={0.8} />
    </group>
  )
}
