'use client'
import React from 'react'
import { useScroll, animated, useSpring, easings } from '@react-spring/web'
import { page } from '../contant.js'

function IntroComponent() {
    const [springs, api] = useSpring(() => ({
        opacity: 1,
        config: key => {
          switch(key){
            case 'opacity':
              return { easing: easings.easeInOutBack,duration: 1500} 
            default:
              return {}
          }
        }
    }),[]) 

    const { scrollYProgress } = useScroll({
        onChange: ({ value: { scrollYProgress } }) => {
            if(scrollYProgress * page > 2){
                api.start({ opacity: 0 })
            }else{
                api.start({ opacity: 1 })
            }
        },
    })

    return (
        <>
            <animated.video 
                src="/chetbaker.mp4" autoPlay muted loop 
                className='w-full h-screen fixed top-0 left-0 border-2 border-black object-cover z-30'
                style={{
                    opacity: springs.opacity.to((opacity) => opacity)
                }}
            />
            <animated.div 
                className='w-full h-screen fixed top-0 left-0 flex flex-col justify-center items-center z-40 text-white text-7xl font-bold font-sans sm:text-3xl'
                style={{
                    transform: scrollYProgress.to(scrollY => `translateY(${50 - ((scrollY * page) * 50)}vh)`)
                }}
            >
                <p className='stroke w-4/5 text-center sm:w-full'>JONAS PAN PORTFOLIO</p>
                <p className='stroke w-4/5 text-center sm:w-full'>FULLSTACK DEV</p>
                <p className='stroke w-4/5 text-center sm:w-full'>TECH STACK I USE</p>
                <p className='stroke w-4/5 text-center sm:w-full'>NEXTJS & REACT</p>
                <p className='stroke w-4/5 text-center sm:w-full'>REDUX TOOLKIT</p>
                <p className='stroke w-4/5 text-center sm:w-full'>REACT THREE FIBER</p>
                <p className='stroke w-4/5 text-center sm:w-full'>NODE & EXPRESS</p>
                <p className='stroke w-4/5 text-center sm:w-full'>TYPESCRIPT</p>
                <p className='stroke w-4/5 text-center sm:w-full'>TAILWIND CSS</p>
                <p className='stroke w-4/5 text-center sm:w-full'>MUI</p>
                <p className='stroke w-4/5 text-center sm:w-full'>PRISMA</p>
                <p className='stroke w-4/5 text-center sm:w-full'>MONGODB</p>
                <p className='stroke w-4/5 text-center sm:w-full'>MYSQL</p>
            </animated.div>
        </>
        
    )
}

export default IntroComponent