import { useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import * as THREE from "three"
import { RigidBody } from "@react-three/rapier"

type Cannon = {
  position: THREE.Vector3
  rotation: THREE.Euler
  shipBody: any
  side: "left" | "right"
}

export default function Cannon({ position, rotation, shipBody, side }: Cannon) {
  const [subscribKeys, getKeys] = useKeyboardControls()
  const cannonBallRef = useRef<any>(null)
  const [canFire, setCanFire] = useState(true)

  const CANNON_FORCE = 2

  const fireCannon = () => {
    if (!shipBody.current) return

    const shipPosition = new THREE.Vector3().copy(shipBody.current.translation())
    const shipRotation = new THREE.Euler().setFromQuaternion(
      new THREE.Quaternion(
        shipBody.current.rotation().x,
        shipBody.current.rotation().y,
        shipBody.current.rotation().z,
        shipBody.current.rotation().w
      )
    )

    const cannonWorldPosition = new THREE.Vector3()
      .copy(position)
      .applyEuler(shipRotation) 
      .add(shipPosition)


const cannonDirection = new THREE.Vector3(side === "right" ? 1: -1, 0.5, 0) 
.applyEuler(shipRotation) 
    
    const cannonBall = {
      position: cannonWorldPosition,
      direction: cannonDirection,
    }

    if (cannonBallRef.current) {
      cannonBallRef.current.setTranslation({
        x: cannonBall.position.x,
        y: cannonBall.position.y,
        z: cannonBall.position.z,
      })
      cannonBallRef.current.applyImpulse(
        {
          x: cannonBall.direction.x * CANNON_FORCE,
          y: cannonBall.direction.y * CANNON_FORCE,
          z: cannonBall.direction.z * CANNON_FORCE,
        },
        true
      )
    }
  }

  useFrame(() => {
    const { rightcannon, leftcannon } = getKeys()
    const shouldFire = (side === "right" && rightcannon) || (side === "left" && leftcannon)

    if (shouldFire && canFire) {
      setCanFire(false)
      fireCannon()

      setTimeout(() => {
        setCanFire(true)
      }, 2000) 
    }
  })

  return (
    <>
      <RigidBody
        ref={cannonBallRef}
        colliders="ball"
        type="dynamic"
        linearDamping={0.1}
        angularDamping={0.1}
        restitution={0.5}
      >
        <mesh scale={0.15}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </RigidBody>
    </>
  )
}
