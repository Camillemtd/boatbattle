'use client'
import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import Ocean from '@/components/threejs/Ocean'
import PlayerBoat from '@/components/threejs/PlayerBoat'

const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), {
  ssr: false
})

// Composant pour gérer la caméra qui suit
function CameraController({ target }) {
  const { camera } = useThree()
  const cameraRef = useRef({
    position: new THREE.Vector3(),
    lookAt: new THREE.Vector3()
  })

  useFrame(() => {
    if (!target.current) return

    // Position cible de la caméra (derrière et au-dessus du bateau)
    const targetPosition = new THREE.Vector3()
    target.current.getWorldPosition(targetPosition)
    
    const boatRotation = target.current.rotation.y
    const distance = 8 // Distance derrière le bateau
    const height = 12  // Hauteur au-dessus du bateau
    
    // Calculer la position de la caméra par rapport au bateau
    const cameraTargetX = targetPosition.x - Math.sin(boatRotation) * distance
    const cameraTargetZ = targetPosition.z - Math.cos(boatRotation) * distance
    
    // Interpolation douce de la position de la caméra
    cameraRef.current.position.lerp(
      new THREE.Vector3(cameraTargetX, targetPosition.y + height, cameraTargetZ),
      0.1
    )
    
    // Interpolation douce du point de visée
    cameraRef.current.lookAt.lerp(targetPosition, 0.1)
    
    // Appliquer les positions à la caméra
    camera.position.copy(cameraRef.current.position)
    camera.lookAt(cameraRef.current.lookAt)
  })

  return null
}

export default function Game() {
  const playerRef = useRef()

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* On retire OrbitControls puisqu'on gère nous-mêmes la caméra */}
        <OrbitControls />
        
        <Ocean />
        <PlayerBoat ref={playerRef} position={[0, -1, 0]} />
        {/* <CameraController target={playerRef} /> */}
      </Canvas>
    </div>
  )
}