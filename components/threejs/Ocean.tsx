import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function Ocean() {

  return (
    <group>
      
      <mesh
        rotation-x={-Math.PI / 2}
        position={[0, -2, 0]} // Position plus basse pour compenser le relief plus important
      >
        <boxGeometry args={[100, 100, 1]} />{" "}
        {/* Résolution encore plus élevée */}
        <meshStandardMaterial
          color={"#66C7F4"}
        />
      </mesh>
    </group>
  )
}
