import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function Ocean() {
  const meshRef = useRef()

  const [colorMap, normalMap, displacementMap, roughnessMap, aoMap] = useLoader(
    THREE.TextureLoader,
    [
      "/Water/Water_002_COLOR.jpg",
      "/Water/Water_002_NORM.jpg",
      "/Water/Water_002_DISP.png",
      "/Water/Water_002_ROUGH.jpg",
      "/Water/Water_002_OCC.jpg",
    ]
  )

  // Configuration des textures avec plus de détails
  const textures = [colorMap, normalMap, displacementMap, roughnessMap, aoMap]
  textures.forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2) // Moins de répétitions pour des vagues plus larges
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.anisotropy = 16
  })

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      // Animation plus lente mais plus ample
      const waveSpeed = 0.01
      textures.forEach((texture) => {
        texture.offset.x = Math.sin(time * waveSpeed) * 0.2
        texture.offset.y = time * waveSpeed
      })

      // Animation plus dramatique du déplacement
      if (meshRef.current.material) {
        meshRef.current.material.displacementScale =
          5.0 + Math.sin(time * 0.5) * 1.0
        // Animation de la normal map pour plus de dynamisme
        meshRef.current.material.normalScale.setX(3 + Math.sin(time * 0.2) * 1)
        meshRef.current.material.normalScale.setY(3 + Math.cos(time * 0.2) * 1)
      }
    }
  })

  return (
    <group>
      <mesh
        ref={meshRef}
        rotation-x={-Math.PI / 2}
        position={[0, -2, 0]} // Position plus basse pour compenser le relief plus important
      >
        <planeGeometry args={[100, 100, 100, 100]} />{" "}
        {/* Résolution encore plus élevée */}
        <meshPhysicalMaterial
          map={colorMap}
          color="#ffffff" // Bleu ciel
          normalMap={normalMap}
          normalScale={new THREE.Vector2(3, 3)}
          displacementMap={displacementMap}
          displacementScale={10} // Relief beaucoup plus important
          displacementBias={-0.8}
          roughnessMap={roughnessMap}
          roughness={0.05} // Encore moins de rugosité pour plus de reflets
          aoMap={aoMap}
          aoMapIntensity={2}
          transparent={true}
          opacity={0.9}
          clearcoat={1}
          clearcoatRoughness={0.05}
          reflectivity={1.2}
          metalness={0.3}
          envMapIntensity={3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
