'use client'
import { useState, useEffect, useRef } from 'react'
import { useIntro } from '../zustand/state.js'
import { useScroll, animated } from '@react-spring/web'
import { page } from '../contant.js'

function IntroduceText() {
    const { intro } = useIntro()
    const [introOpacity, setIntroOpacity] = useState(false)
    const [introDisplay, setIntroDisplay] = useState(false)
    const introRef = useRef(false)
    const { scrollYProgress } = useScroll()

    useEffect(() => {
        if( introRef.current ){
            if(intro){
                setIntroDisplay(true)
                setTimeout(() => setIntroOpacity(true),50)
            }else{
                setIntroOpacity(false)
                setTimeout(() => setIntroDisplay(false),200)
            }
        }else{
            introRef.current = true
        }
        
    },[intro])

    return (
        <animated.div 
            className='w-1/3 h-2/5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12'
            style={{
                opacity: introOpacity ? '1' : '0',
                transition: 'opacity',
                transitionDuration: '1s',
                transitionTimingFunction: 'ease-in-out',
                display: introDisplay ? 'block': 'none',
                zIndex: scrollYProgress.to(scrollY => {
                    if(scrollY * page > 16.5 && introDisplay){
                        return '60'
                    }
                    return '3'
                })
            }}
        >
            <div className='text-white font-fraktionMono text-xs h-full w-full flex flex-col justify-center gap-2'>
                <div className='flex w-full'>
                    <p className='w-1/2 sm:w-1/3'>NAME</p>
                    <p className='w-1/2 font-chi sm:2/3'>潘宗諭</p>
                </div>
                <div className='flex w-full'>
                    <p className='w-1/2 sm:w-1/3'>EMAIL</p>
                    <p className='w-1/2 sm:w-2/3'>rachel7465022@gmail.com</p>
                </div>
                <div className='flex w-full'>
                    <p className='w-1/2 sm:w-1/3'>EXPERIENCE</p>
                    <p className='w-1/2 font-chi sm:w-2/3'>方陣聯合數位公司(2021 ~ 2023)</p>
                </div>
            </div>
        </animated.div>
    )
}

export default IntroduceText