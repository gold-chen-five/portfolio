'use client'
import {useEffect, useState} from 'react'
import { useScroll, animated} from '@react-spring/web'
import { page } from '../contant.js'
import ConactCard from './ConactCard.js'
import { useIntro,useMediaQuery } from '../zustand/state.js'

function ContactComponent() {
    const { scrollYProgress } = useScroll()
    // const [intro, setIntro] = useState(false)
    const { intro, setIntro } = useIntro()
    const { mediaQuery } = useMediaQuery()
    const [introOpacity, setIntroOpacity] = useState(false)
    const [introDisplay, setIntroDisplay] = useState(false)
    
    useEffect(() => {
        //console.log(intro)
        if(mediaQuery)  setIntro(true)
        else setIntro(false)
    },[mediaQuery])
    return (
        <animated.div 
            className=' justify-center items-center z-[8] absolute top-0 left-0 w-full h-screen'
            style={{
                display: scrollYProgress.to(scrollY => {
                    if(scrollY * page > 15.5)  return 'flex'
                    return 'none'
                }),
                opacity: scrollYProgress.to(scrollY => {
                    if(scrollY * page > 16.5)  return '1'
                    return '0'
                }),
                transition: 'opacity',
                transitionDuration: '1s',
                transitionTimingFunction: 'ease-in',
            }}
        >
            <div className='w-1/5 h-full flex justify-center items-center pl-8'>
                {/* <ConactCard /> */}
            </div>
            <div className='w-3/5 h-full flex flex-col justify-center items-center '>
                <div 
                    className='flex flex-col justify-center items-center'
                    style={{
                        transform: intro ? `${ mediaQuery ? 'translateY(-16rem)' :'translateY(-10rem)'}` : 'translateY(0)',
                        transition: 'transform',
                        transitionDuration: '0.7s',
                        transitionTimingFunction: 'ease-in-out',
                    }}
                >
                    <p className=' font-sans text-9xl strokeNohover font-bold sm:text-7xl'>THANKS</p>
                    <p className=' font-sans text-9xl strokeNohover font-bold sm:text-7xl'>FOR</p>
                </div>
                
                <div 
                    className='flex flex-col justify-center items-center'
                    style={{
                        transform: intro ? `${ mediaQuery ? 'translateY(16rem)' :'translateY(10rem)'}` : 'translateY(0)',
                        transition: 'transform',
                        transitionDuration: '0.7s',
                        transitionTimingFunction: 'ease-in-out',
                    }}
                >
                    <p className=' font-sans text-9xl strokeNohover font-bold sm:text-7xl'>YOUR</p>
                    <p className=' font-sans text-9xl strokeNohover font-bold sm:text-7xl'>VISIT</p>
                </div>
            </div>
            <div 
                className='w-1/5 h-full text-white flex justify-center items-center'
            >
            </div>
            
        </animated.div>
    )
}

export default ContactComponent