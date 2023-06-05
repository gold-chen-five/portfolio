import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame, useThree } from "@react-three/fiber"
import { useScroll } from '@react-spring/web'
import { easing } from 'maath'
import * as THREE from 'three';
import { page } from '../contant.js'
import { useCard, useMediaQuery } from '../zustand/state.js'

function Car() {
    const { cardBackSide } = useCard()
    const { mediaQuery } = useMediaQuery()
    const carRef = useRef()
    const car = useGLTF('/models/car.glb')
    const {clips, actions, mixer} = useAnimations(car.animations, car.scene)
    const sqawnAnimation = useRef(false)

    mixer.addEventListener('finished', (e) => {
        const actionName = e.action.getClip().name
        switch(actionName){
            case 'SpawnClean':
                sqawnAnimation.current = true
                const action1 = actions['Idle.2']
                action1.play()
                const action2 = actions['Idle.1']
                action2.play()
                
                break
            default:
                return
        }
    })

    const { scrollYProgress } = useScroll({
        onChange: ({ value: { scrollYProgress } }) => { 
            if(scrollYProgress * page >= 16.9 ){
                actions['SpawnClean'].paused = false
            }
        }
    })

    useFrame((state, delta) => {
        const xLength = mediaQuery ? 1.5 : 2.5
        const carPosition = mediaQuery ? -10.8 : -10.2
        if(sqawnAnimation.current) easing.damp3(carRef.current.position, [state.pointer.x * xLength, carPosition, 0], 1.5, delta)
        easing.dampE(carRef.current.rotation, [0, state.pointer.x / 2 * Math.PI , 0], 0.2, delta)
    })

    useEffect(() => {
        clips[2].duration = 3.5
        
        const action = actions['SpawnClean']
        action.setLoop(THREE.LoopOnce)
        action.play()
        action.paused = true
    },[])

    useEffect(() => {
        const action = actions['Arranque']
        if(cardBackSide){
            const action1 = actions['Idle.2']
            action1.stop()
            const action2 = actions['Idle.1']
            action2.stop()
            action.fadeIn(0.1).play()
        }else{
            action.stop()
            if(sqawnAnimation.current){
                const action1 = actions['Idle.2']
                action1.play()
                const action2 = actions['Idle.1']
                action2.play()
            }
        }
        
    },[cardBackSide])

    return (
        <primitive
            ref={carRef} 
            object={ car.scene }
            scale={ 0.35 }
            position={mediaQuery ? [0,-10.8,0] : [0,-10.2,0]}
            rotation-y={1 * Math.PI}
        />
    )
}

export default Car

useGLTF.preload('/models/car.glb')