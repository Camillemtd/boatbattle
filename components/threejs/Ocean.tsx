import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

export default function Ocean() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uWaveAmplitude: { value: 0.1 },
        uWaveFrequency: { value: 3.0 },
        uWaveSpeed: { value: 0.5 },
        uMainColor: { value: new THREE.Color('#1E90FF') },  // Bleu dodger
        uSecondaryColor: { value: new THREE.Color('#87CEEB') }, // Bleu ciel
        uPatternScale: { value: 15.0 }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uWaveAmplitude;
        uniform float uWaveFrequency;
        uniform float uWaveSpeed;
        
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          
          float elevation = sin(modelPosition.x * uWaveFrequency + uTime * uWaveSpeed) * 
                          cos(modelPosition.z * uWaveFrequency * 0.5 + uTime * uWaveSpeed * 0.5) * 
                          uWaveAmplitude;
          
          modelPosition.y += elevation;
          
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectedPosition;
          
          vUv = uv;
          vElevation = elevation;
        }
      `,
      fragmentShader: `
        uniform vec3 uMainColor;
        uniform vec3 uSecondaryColor;
        uniform float uTime;
        uniform float uPatternScale;
        
        varying vec2 vUv;
        varying float vElevation;
        
        float pattern(vec2 uv) {
          // Création de motifs de vagues stylisés
          float wave1 = sin(uv.x * uPatternScale + uTime);
          float wave2 = sin((uv.x + uv.y) * uPatternScale * 0.5 + uTime * 0.5);
          float wave3 = sin(uv.y * uPatternScale * 0.7 - uTime * 0.3);
          
          float waves = wave1 * 0.5 + wave2 * 0.25 + wave3 * 0.25;
          waves = smoothstep(-0.2, 0.2, waves);
          
          return waves;
        }

        void main() {
          float waves = pattern(vUv);
          
          // Mélange des couleurs pour créer un effet de vagues
          vec3 color = mix(uMainColor, uSecondaryColor, waves * 0.5 + vElevation * 2.0);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `
    }),
    []
  )

  useFrame((state) => {
    const { clock } = state
    meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime() * 0.5 // Ralenti l'animation
  })

  return (
    <mesh
      ref={meshRef}
      rotation-x={-Math.PI * 0.5}
      position={[0, -2, 0]}
    >
      <planeGeometry args={[500, 500, 64, 64]} />
      <shaderMaterial
        fragmentShader={shaderArgs.fragmentShader}
        vertexShader={shaderArgs.vertexShader}
        uniforms={shaderArgs.uniforms}
        side={THREE.DoubleSide}
        transparent={true}
      />
    </mesh>
  )
}