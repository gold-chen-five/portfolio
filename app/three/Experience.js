'use client'
import { Suspense, useState } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera, PresentationControls,Float, SoftShadows, PerformanceMonitor, Preload} from "@react-three/drei";
import { useIntro, useMediaQuery } from '../zustand/state.js';
import Television from './Television.js'
import Tv from './Tv.js'
import Car from './Car.js';
import Spotlight from './Spotlight.js';
import Loading from '../scenes/loading/load.js';
function Experience({textState}) {
  const [enabled, enable] = useState(true)
  const { intro } = useIntro()
  const { mediaQuery } = useMediaQuery()
  return (
    <div 
      className={`w-full h-full absolute top-0 left-0 z-10 ${intro && 'blur-sm'} sm:blur-none lg:blur-none`}
      style={{
        opacity: textState ? '1' : '0',
        transition: 'opacity',
        transitionDuration: textState ? '1s' : '0.4s',
        transitionTimingFunction: 'ease-in',
        transitionDelay: textState ? '0.2s' : '0.2s' 
      }}
    >
      <Suspense fallback={null}>
      <Canvas
        shadows 
        
        camera={{ 
          fov: 45,
        }}
      >
        {/* <color attach="background" args={['#121B1E']} /> */}
        {/* <OrbitControls enablePan={false}  minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2}/> */}
        
          
        <Suspense fallback={null}>
          <PresentationControls
              global
              rotation={[0.13,0.1,0]}
              polar={[-0.2,0.1]}
              azimuth={[-0.4,0.5]}
              config={{mass: 2, tension: 400}}
              snap={{mass: 4, tension: 400}}
          >
            <Float rotationIntensity={0.2}>
              <Television scale={ mediaQuery ? 0.6 : 0.9 } position={mediaQuery ? [-0.2,-6.9,2] : [1.4,-7.5,2] }/>
            </Float>
          </PresentationControls>
          
          <Car />

          <Tv scale={0.007} position={ mediaQuery ? [0.5,-1.5,0] : [1.2,-1.5,0]} />
        </Suspense>
        
        
        {/* <Computer /> */}
        

        <Environment preset="city" />
         
        {enabled && <SoftShadows />}
      
        <PerformanceMonitor onDecline={() => enable(false)} />
        <Spotlight/>
        <Preload all/>
      </Canvas>
      </Suspense>
      
    </div>
  )
}

export default Experience