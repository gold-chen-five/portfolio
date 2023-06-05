import {useRef} from 'react'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

function Spotlight() {
    const light = useRef()
    useFrame((state, delta) => {
        easing.damp3(light.current.position, [state.pointer.x * 12, 0, 8 + state.pointer.y * 4], 0.2, delta)
    })
    
    return (
        <PerspectiveCamera makeDefault fov={65} position={[0,0,4]}>
            <spotLight angle={0.5} penumbra={0.5} ref={light} castShadow intensity={5} shadow-mapSize={1024} shadow-bias={0.01}>
                <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
            </spotLight>
        </PerspectiveCamera>
    )
}

export default Spotlight