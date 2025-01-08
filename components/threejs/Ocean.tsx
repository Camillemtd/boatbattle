import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import Island from "./Island"

export default function Ocean() {

  return (
    <group>
      <Island/>
      <mesh
        rotation-x={-Math.PI / 2}
        position={[0, -2, 0]} // Position plus basse pour compenser le relief plus important
      >
        <planeGeometry args={[1000, 1000, 100, 100]} />{" "}
        {/* Résolution encore plus élevée */}
        <meshStandardMaterial
          color={"#66C7F4"}
        />
      </mesh>
    </group>
  )
}
