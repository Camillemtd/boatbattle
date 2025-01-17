"use client"
import { OrbitControls } from "@react-three/drei"
import dynamic from "next/dynamic"
import { useRef } from "react"
import * as THREE from "three"
import Ocean from "@/components/threejs/Ocean"
import PlayerBoat from "@/components/threejs/PlayerBoat"
import Island from "./Island"
import { Physics } from "@react-three/rapier"

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  {
    ssr: false,
  }
)

export default function Game() {
  const playerRef = useRef<THREE.Mesh>(null)

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {/* <OrbitControls/> */}
		<color args={ [ '#f7efd7' ] } attach="background" />
        <Physics debug={true}>
          <Island />
          <Ocean />
          <PlayerBoat />
        </Physics>
      </Canvas>
    </div>
  )
}
