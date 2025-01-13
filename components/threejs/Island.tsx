import { useGLTF } from '@react-three/drei'

export default function Island() {
    const { scene } = useGLTF('./model/island.glb')
    
    // Pour une seule instance
    return (
        <primitive object={scene} position={[40, 0, 0]} scale={1} />
    )
    
}

useGLTF.preload('./model/island.glb')