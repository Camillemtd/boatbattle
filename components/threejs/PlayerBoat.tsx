import { useRef, forwardRef, useEffect, ForwardedRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, Clone, useKeyboardControls } from "@react-three/drei"
import * as THREE from "three"
import { useKeyboard } from "../../hooks/useKeyboard"
import { RigidBody} from "@react-three/rapier"
import { Mesh, BufferGeometry, Material } from "three"

type MeshType = Mesh<BufferGeometry, Material | Material[]>

useGLTF.preload("/model/ship-pirate-large.glb")

const PlayerBoat = forwardRef((props: any, ref: ForwardedRef<MeshType>) => {
  const { scene } = useGLTF("/model/ship-pirate-large.glb")
  const [subscribKeys, getKeys] = useKeyboardControls()
  
  const body = useRef<any>(null)
  const rotationSpeed = 2
  const moveSpeed = 50
  
  
  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys()
    
    if (!body.current) return

    // Obtenir la transformation actuelle
    const quaternion = body.current.rotation()
    const rotation = new THREE.Euler().setFromQuaternion(
      new THREE.Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w)
    )

    // Créer un vecteur de direction basé sur la rotation
    const direction = new THREE.Vector3(0, 0, 1)
    direction.applyEuler(rotation)
    
    // Rotation
    if (leftward) {
      body.current.setAngvel({ x: 0, y: rotationSpeed, z: 0 })
    } else if (rightward) {
      body.current.setAngvel({ x: 0, y: -rotationSpeed, z: 0 })
    } else {
      body.current.setAngvel({ x: 0, y: 0, z: 0 })
    }

    // Mouvement avant/arrière en utilisant le vecteur de direction
    if (forward) {
      body.current.applyImpulse({
        x: direction.x * moveSpeed,
        y: 0,
        z: direction.z * moveSpeed
      }, true)
    }
    if (backward) {
      body.current.applyImpulse({
        x: -direction.x * moveSpeed,
        y: 0,
        z: -direction.z * moveSpeed
      }, true)
    }
  })

  return (
    <RigidBody
      colliders="cuboid"
      type="dynamic"
      ref={body}
      restitution={0.2}
      friction={1}
      linearDamping={0.95}
      angularDamping={0.9}
      enabledRotations={[false, true, false]}
    >
      <group {...props}>
        <primitive
          object={scene}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, 0]}
        />
      </group>
    </RigidBody>
  )
})

PlayerBoat.displayName = "PlayerBoat"

export default PlayerBoat