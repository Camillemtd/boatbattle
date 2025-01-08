import { useRef, forwardRef, useEffect, ForwardedRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Clone } from '@react-three/drei'
import * as THREE from 'three'
import { useKeyboard } from '../../hooks/useKeyboard'
import { Mesh, BufferGeometry, Material, Object3DEventMap } from 'three'

type MeshType = Mesh<BufferGeometry, Material | Material[]>

useGLTF.preload('/model/ship-pirate-large.glb')

const PlayerBoat = forwardRef((
  props: any,
  ref: ForwardedRef<MeshType>
) => {
  const localRef = useRef<MeshType>(null)
  const velocityRef = useRef(new THREE.Vector3())
  const rotationVelocityRef = useRef(0)

  const { scene } = useGLTF('/model/ship-pirate-large.glb')
  
  // Variables de contrôle du bateau
  const SPEED = 0.01
  const ROTATION_SPEED = 0.002
  const WAVE_HEIGHT = 0.2
  const TILT_FACTOR = 0.2
  const BUOYANCY = 0.15 // Augmenté pour une force de flottaison plus forte
  const IMMERSION_DEPTH = 0.9 // Augmenté pour une immersion plus profonde
  const BASE_HEIGHT = -1 // Hauteur de base de l'océan

  const { forward, backward, left, right } = useKeyboard()

  useFrame((state) => {
    if (!localRef.current) return

    const mesh = localRef.current
    const velocity = velocityRef.current

    // Mouvement avant/arrière
    if (forward) {
      velocity.z += Math.cos(mesh.rotation.y) * SPEED
      velocity.x += Math.sin(mesh.rotation.y) * SPEED
    }
    if (backward) {
      velocity.z -= Math.cos(mesh.rotation.y) * SPEED
      velocity.x -= Math.sin(mesh.rotation.y) * SPEED
    }

    // Rotation
    if (left) rotationVelocityRef.current += ROTATION_SPEED
    if (right) rotationVelocityRef.current -= ROTATION_SPEED

    mesh.rotation.y += rotationVelocityRef.current
    rotationVelocityRef.current *= 0.95

    // Calcul précis de la hauteur des vagues
    const time = state.clock.getElapsedTime()
    const waveX = Math.sin(mesh.position.x * 0.5 + time) * WAVE_HEIGHT
    const waveZ = Math.cos(mesh.position.z * 0.5 + time) * WAVE_HEIGHT
    const waveHeight = waveX + waveZ + BASE_HEIGHT

    // Force la position Y à suivre les vagues avec l'immersion
    const targetY = waveHeight - IMMERSION_DEPTH

    // Application directe de la position Y avec un peu de lissage
    mesh.position.y += (targetY - mesh.position.y) * BUOYANCY

    // Calcul des angles de vagues pour l'inclinaison
    const waveGradientX = Math.cos(mesh.position.x * 0.5 + time) * WAVE_HEIGHT * 0.5
    const waveGradientZ = -Math.sin(mesh.position.z * 0.5 + time) * WAVE_HEIGHT * 0.5

    // Application des rotations
    mesh.rotation.x = waveGradientZ * TILT_FACTOR - velocity.z * TILT_FACTOR
    mesh.rotation.z = -waveGradientX * TILT_FACTOR + velocity.x * TILT_FACTOR

    // Mouvement horizontal
    mesh.position.x += velocity.x
    mesh.position.z += velocity.z

    // Amortissement de la vélocité horizontale uniquement
    velocity.x *= 0.95
    velocity.z *= 0.95
  })

  // Synchroniser la ref locale avec la ref transmise
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(localRef.current)
      } else {
        ref.current = localRef.current
      }
    }
  }, [ref])

  return (
    <group ref={localRef} {...props}>
      <Clone 
        object={scene}
        scale={[0.5, 0.5, 0.5]}
      />
    </group>
  )
})

PlayerBoat.displayName = 'PlayerBoat'

export default PlayerBoat