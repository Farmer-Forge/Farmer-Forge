import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Full-screen domain-warped noise: the "molten metal" behind the hero.
// Rendered as a clip-space quad so it always fills the canvas regardless of camera.

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy * 2.0, 0.0, 1.0);
  }
`

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // Palette pulled from DESIGN.md tokens
  const vec3 INK    = vec3(0.024, 0.027, 0.039);
  const vec3 EMBER7 = vec3(0.761, 0.212, 0.043);
  const vec3 EMBER5 = vec3(1.000, 0.353, 0.122);
  const vec3 EMBER3 = vec3(1.000, 0.702, 0.278);
  const vec3 PLASMA = vec3(0.239, 0.878, 1.000);

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < 5; i++) { v += a * noise(p); p = r * p * 2.02; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
    float t = uTime * 0.6;
    vec2 p = uv * 1.6 + uMouse * 0.15;

    vec2 q = vec2(fbm(p + vec2(0.0, t * 0.06)), fbm(p + vec2(5.2, 1.3) - t * 0.05));
    vec2 r = vec2(fbm(p + 3.5 * q + vec2(1.7, 9.2) + t * 0.09),
                  fbm(p + 3.5 * q + vec2(8.3, 2.8) - t * 0.07));
    float f = fbm(p + 3.8 * r);

    // Heat bands: mostly dark, with rivers of ember and a white-hot core.
    float heat = smoothstep(0.42, 0.95, f);
    vec3 col = INK;
    col = mix(col, EMBER7 * 0.55, smoothstep(0.35, 0.7, f));
    col = mix(col, EMBER5, pow(heat, 2.2) * 0.85);
    col += EMBER3 * pow(heat, 5.0) * 0.9;

    // Cold plasma veins where the warp field folds
    float vein = smoothstep(0.62, 0.9, r.y) * smoothstep(0.55, 0.3, f);
    col += PLASMA * vein * 0.22;

    // Composition: heat pools toward the right/bottom, text side stays calm
    float mask = smoothstep(-0.9, 0.9, uv.x + 0.25) * 0.85 + 0.15;
    col = mix(INK, col, mask);

    // Vignette + bottom fade into the page
    float vig = smoothstep(1.35, 0.25, length(uv * vec2(0.8, 1.0)));
    col *= vig;
    col = mix(INK, col, smoothstep(0.0, 0.35, vUv.y));

    gl_FragColor = vec4(col, 1.0);
  }
`

export function MoltenField({ still = false }) {
  const mat = useRef()
  const { size, gl } = useThree()
  const mouse = useRef(new THREE.Vector2())

  const uniforms = useMemo(
    () => ({
      uTime: { value: 8 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2() },
    }),
    [],
  )

  useFrame((state, delta) => {
    if (!mat.current) return
    const u = mat.current.uniforms
    const dpr = gl.getPixelRatio()
    u.uRes.value.set(size.width * dpr, size.height * dpr)
    if (!still) u.uTime.value += delta
    mouse.current.lerp(state.pointer, 0.03)
    u.uMouse.value.copy(mouse.current)
  })

  return (
    <mesh frustumCulled={false} renderOrder={-1}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}
