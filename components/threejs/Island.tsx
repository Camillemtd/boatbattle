import { useGLTF } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"

export default function Island() {
  const { scene } = useGLTF("./model/island.glb")

  return (
    <RigidBody type="fixed" colliders="trimesh" restitution={0.2} friction={0} mass={1000}>
      <primitive object={scene} position={[20, -1.1, 0]} scale={1} castShadow receiveShadow/>
    </RigidBody>
  )
}

useGLTF.preload("./model/island.glb")
