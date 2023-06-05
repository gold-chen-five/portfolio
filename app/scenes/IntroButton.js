'use client'
import React from 'react'
import { useIntro } from '../zustand/state.js'
import { useScroll, animated } from '@react-spring/web'
import { page } from '../contant.js'

function IntroButton() {
    const { intro, setIntro } = useIntro()
    const { scrollYProgress } = useScroll()
    return (
        <animated.div 
            className={`fixed top-1/2 right-16 -translate-y-1/2 flex justify-center items-center border rounded-full w-28 h-6 ${intro ? 'bg-white' : 'bg-black'} transition ease-in-out duration-300 sm:hidden lg:hidden`}
            style={{
                transition: 'opacity 1s ease-in',
                opacity: scrollYProgress.to(scrollY => {
                    if(scrollY * page > 16.5)  return '1'
                    return '0'
                }),
                zIndex: scrollYProgress.to(scrollY => {
                    if(scrollY * page > 16.5)  return '60'
                    return '10'
                }),
            }}
            onMouseOver={() => setIntro(true)}
            onMouseLeave={() => setIntro(false)}
        >
            <div className={`text-xs ${intro ? 'text-black' : 'text-white'} transition ease-in-out duration-300 font-fraktionMono`}>INTRODUCE</div>
        </animated.div>
    )
}

export default IntroButton