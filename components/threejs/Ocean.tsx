import { RigidBody, CuboidCollider } from "@react-three/rapier"

export default function Ocean() {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[100, 100, 1]} />
        <meshStandardMaterial
          color="#66C7F4"
          transparent={true}
          opacity={0.8}
        />
      </mesh>

      <RigidBody type="fixed" colliders={false} friction={1}>
        <CuboidCollider
          position={[0, -2.2, 0]}
          args={[50, 0.1, 50]}
        />
      </RigidBody>
    </group>
  )
}
