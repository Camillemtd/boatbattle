"use client"
import { Canvas } from "@react-three/fiber"

export default function Home() {
  return (
    <div className="relative w-full h-[100dvh]">
      <Canvas>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  )
}
