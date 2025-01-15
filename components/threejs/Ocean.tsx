import { RigidBody, CuboidCollider } from "@react-three/rapier"
import * as THREE from "three"

const boxGeometry = new THREE.BoxGeometry(100, 10, 1)

const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" })

function Walls() {
  return (
    <RigidBody type="fixed" restitution={1} friction={0}>
      <mesh
        geometry={boxGeometry}
        material={wallMaterial}
        position={[0, 0, -50]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={boxGeometry}
        material={wallMaterial}
        position={[0, 0, 50]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={boxGeometry}
        material={wallMaterial}
        position={[50, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={boxGeometry}
        material={wallMaterial}
        position={[-50, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow
        receiveShadow
      />
    </RigidBody>
  )
}

export default function Ocean() {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[100, 100, 1]} />
        <meshStandardMaterial
          color="#66C7F4"
          transparent={true}
          opacity={0.9}
          depthWrite={true}
        />
      </mesh>

      <RigidBody type="fixed" colliders={false} friction={1}>
        <CuboidCollider position={[0, -2.2, 0]} args={[50, 0.1, 50]} />
      </RigidBody>

      <Walls />
    </group>
  )
}
