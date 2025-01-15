"use client"

import Game from "@/components/threejs/Game"
import { KeyboardControls } from "@react-three/drei"

export default function Home() {
  return (
    <div className="relative w-full h-[100dvh]">
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Game />
      </KeyboardControls>
    </div>
  )
}
