import { useRef, forwardRef, useEffect, ForwardedRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useKeyboard } from './useKeyboard'
import { Mesh, BufferGeometry, Material, Object3DEventMap } from 'three'

type MeshType = Mesh<BufferGeometry, Material | Material[]>

const PlayerBoat = forwardRef((
  props: any, 
  ref: ForwardedRef<MeshType>
) => {
  const localRef = useRef<MeshType>(null)
  const velocityRef = useRef(new THREE.Vector3())
  const rotationVelocityRef = useRef(0)
  
  // Variables de contrôle du bateau
  const SPEED = 0.01
  const ROTATION_SPEED = 0.002
  const WAVE_HEIGHT = 0.2
  const TILT_FACTOR = 0.2
  const BUOYANCY = 0.01
  
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
    
    // Appliquer la rotation avec amortissement
    mesh.rotation.y += rotationVelocityRef.current
    rotationVelocityRef.current *= 0.95
    
    // Calculer la hauteur des vagues à la position du bateau
    const time = state.clock.getElapsedTime()
    const waveX = Math.sin(mesh.position.x + time) * WAVE_HEIGHT
    const waveZ = Math.cos(mesh.position.z + time) * WAVE_HEIGHT
    const targetY = -1 + waveX + waveZ
    
    // Appliquer la flottaison avec un effet de ressort
    velocity.y += (targetY - mesh.position.y) * BUOYANCY
    
    // Inclinaison du bateau en fonction des vagues
    mesh.rotation.x = -velocity.z * TILT_FACTOR
    mesh.rotation.z = velocity.x * TILT_FACTOR
    
    // Appliquer les vélocités avec amortissement
    mesh.position.x += velocity.x
    mesh.position.y += velocity.y
    mesh.position.z += velocity.z
    
    velocity.multiplyScalar(0.95)
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
    <mesh ref={localRef} {...props}>
      <boxGeometry args={[1, 0.5, 2]} />
      <meshStandardMaterial color="#8b4513" />
    </mesh>
  )
})

PlayerBoat.displayName = 'PlayerBoat'

export default PlayerBoat