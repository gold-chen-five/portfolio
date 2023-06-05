'use client'
import React, { useRef,useState } from "react";
import { useGLTF, Html, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useScroll } from '@react-spring/web'
import { page } from "../contant.js";

export default function Model(props) {
  const [website,setWebsite] = useState('https://admin-frontend-swvv.onrender.com')
  const model = useGLTF("/models/television.glb");
  const modelRef = useRef()
  let camera = useThree((state) => state.camera)
  const { scrollYProgress } = useScroll({
    onChange: ({ value: { scrollYProgress } }) => {     
        if(scrollYProgress * page > 10 && scrollYProgress * page <= 12){
          camera.position.set(0, 0 - ((scrollYProgress * page - 10) * 2.75),4)
        }
        else if(scrollYProgress * page > 12 && scrollYProgress * page <= 14.5){
          camera.position.set(0,-5.5,4)
          setWebsite('https://admin-frontend-swvv.onrender.com')
        }
        else if(scrollYProgress * page > 14.5 && scrollYProgress * page <= 15.5){
          camera.position.set(0,-5.5,4)
          setWebsite('https://social-media-frontend-k77k.onrender.com')
        }
        else if(scrollYProgress * page > 15.5 ){
          camera.position.set(0,-5.5 - ((scrollYProgress * page - 15.5) * 2.75),4)
        }
        
        else{
          camera.position.set(0,0,4)
        }
    },
  })
  
  return (
    <primitive
      ref={modelRef} 
      object={ model.scene }
      // scale={ 0.9 }
      // position={[1.4,-7.5,2]}
      rotation-y={4}
      {...props} 
    >
      <Html
          transform
          castShadow 
          receiveShadow
          wrapperClass='htmlScreen'
          distanceFactor={0.688}
          position={[0.51,2.5,0]}
          rotation-y={1.58}
      >
          <iframe src={website}/>
      </Html>
    </primitive>
  );
}

useGLTF.preload("/models/television.glb");
