'use client'
import * as THREE from 'three'
import { useState, useRef, useEffect } from 'react'
import { useGLTF, useVideoTexture } from '@react-three/drei'
import { useScroll } from '@react-spring/web'
import { animated } from '@react-spring/three'
import { page } from '../contant.js'

export default function Tv({ ...props}) {
    const group = useRef()
    const { nodes } = useGLTF('/models/tv-transformed.glb')
    const [stream, setStream] = useState('/videos/lend-system.mp4')
    const texture = useVideoTexture(stream)
    texture.flipY = false
    texture.repeat.x = 5
    texture.repeat.y = 9
    texture.offset.x = -0.1
    texture.offset.y = 0
    texture.wrapT = THREE.RepeatWrapping
    texture.wrapS = THREE.RepeatWrapping

    const { scrollYProgress } = useScroll({
      onChange: ({ value: { scrollYProgress } }) => {
        if(scrollYProgress * page > 5){
          setStream('/videos/lend-system.mp4')
        }else{
          setStream('/videos/weiwuying.mp4')
        }
      }
    })
    
   
    return (
      <animated.group 
        ref={group} 
        {...props} 
        dispose={null} 
        rotation-y={scrollYProgress.to(scrollY => {
          if(scrollY * page > 5 && scrollY * page <= 8) return 0 + (( scrollY * page - 5 ) / 3 * 5.8)
          if(scrollY * page > 8 ) return 5.8
          return 0
        })}
      >
        <mesh castShadow receiveShadow geometry={nodes.body.geometry} material={nodes.body.material} />
        <mesh scale={[-1, 1, 1]} position={[-43.65, 161.61, 131.29]} geometry={nodes.screen.geometry}>
          <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0} toneMapped={false} map={texture}>
          </meshPhysicalMaterial>
        </mesh>
      </animated.group>
    )
  }
  
  useGLTF.preload('/models/tv-transformed.glb')