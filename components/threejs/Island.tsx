import { Clone, useGLTF } from '@react-three/drei'

export default function Island() {
    const { scene } = useGLTF('./model/island.glb')
    
    // Pour une seule instance
    return (
        <Clone object={scene} position={[10, -0.9, 0]} scale={1} />
    )
    
}

useGLTF.preload('./island.glb')