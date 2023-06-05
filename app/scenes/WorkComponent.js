'use client'
import {useEffect, useState} from 'react'
import Experience from '../three/Experience'
import { useScroll, animated, useSpring, easings } from '@react-spring/web'
import { page } from '../contant.js'
import SideProjectComponent from './SideProjectComponent.js'
import Link from 'next/link';
import ContactComponent from './ContactComponent'
import { useHover } from '../zustand/state.js'

function WorkComponent() {
    const [textState, setTextState] = useState(false)
    const [webConact,setWebConact] = useState(0)
    const { setHover } = useHover()

    const [springs, api] = useSpring(() => ({
        opacity: 1,
        config: key => {
          switch(key){
            case 'opacity':
              return { easing: easings.easeInOutBack, duration: 1500} 
            default:
              return {}
          }
        }
    }),[]) 

    const { scrollYProgress } = useScroll({
        onChange: ({ value: { scrollYProgress } }) => {
            if(scrollYProgress * page > 10 && scrollYProgress * page <= 12)  setWebConact(1)
            else if(scrollYProgress * page > 12 && scrollYProgress * page <= 14.5) setWebConact(2)
            else if(scrollYProgress * page > 14.5 &&  scrollYProgress * page <= 15.5) setWebConact(3)
            else setWebConact(0)

            if(scrollYProgress * page > 3){
                setTextState(true)
            }else{
                setTextState(false)
            }
        },
    })
    useEffect(() => {console.log(webConact)},[webConact])
  return (
    <animated.div 
        className='w-full h-screen fixed top-0 left-0 bg-black' 
        style={{zIndex: scrollYProgress.to(scrollY => {
            if(scrollY * page > 3)  return '50'
            return '20'
        })}}
    >
        <animated.div 
            className='z-30 absolute top-0 left-1/2'
            style={{
                transform: scrollYProgress.to(scrollY => {
                    if(scrollY * page > 5){
                        return `translateX(-50%) translateY(${15 - ((scrollY * page - 5) * 50)}vh)`
                    }
                    return `translateX(-50%) translateY(15vh)`
                }),
            }}
        >
            <h1 
                className='text-white text-8xl font-bold font-sans sm:text-3xl'
                style={{
                    opacity: textState ? '1' : '0',
                    transition: 'opacity',
                    transitionDuration: textState ? '1s' : '0.4s',
                    transitionTimingFunction: 'ease-in',
                    transitionDelay: textState ? '0.2s' : '0.2s'
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                MY WORK
            </h1>
            <div className='flex items-center'>
                <div
                    style={{
                        opacity: textState ? '1' : '0',
                        transition: 'opacity',
                        transitionDuration: textState ? '1s' : '0.4s',
                        transitionTimingFunction: 'ease-in',
                        transitionDelay: textState ? '0.5s' : '0.2s'
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)} 
                >
                    <h1 className='text-white text-6xl font-bold font-sans sm:text-2xl' >Project</h1>
                    <h1 className='text-white text-6xl font-bold font-sans sm:text-2xl' >Name</h1>
                </div>
                <div 
                    className='text-white text-9xl font-bold font-sans strokeNohover sm:text-5xl'
                    style={{
                        opacity: textState ? '1' : '0',
                        transition: 'opacity',
                        transitionDuration: textState ? '1s' : '0.4s',
                        transitionTimingFunction: 'ease-in',
                        transitionDelay: textState ? '0.9s' : '0.2s'
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    衛武營
                </div>
            </div>
            <div>
                <h1 
                    className='text-white text-7xl font-bold font-sans strokeNohover sm:text-3xl' 
                    style={{
                        opacity: textState ? '1' : '0',
                        transition: 'opacity',
                        transitionDuration: textState ? '1s' : '0.4s',
                        transitionTimingFunction: 'ease-in',
                        transitionDelay: textState ? '0.7s' : '0.2s'
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    DESCRIPTION
                </h1>
                <p 
                    className='text-white text-2xl font-bold font-sans w-96 sm:text-base sm:w-64'
                    style={{
                        opacity: textState ? '1' : '0',
                        transition: 'opacity',
                        transitionDuration: textState ? '1s' : '0.4s',
                        transitionTimingFunction: 'ease-in',
                        transitionDelay: textState ? '0.9s' : '0.2s'
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    提供衛武營更多元導覽服務，主頁為3D模型，可利用模型進入場館內，場內有六個場館的360環境照導覽，可使用此網站在場館內移動，讓民眾更熟悉衛武營。
                </p>
                <Link
                    href='https://360viewtour.npac-weiwuying.org'
                    className='text-white text-3xl font-bold font-sans w-96 stroke '
                    style={{
                        opacity: textState ? '1' : '0',
                        transition: 'opacity',
                        transitionDuration: textState ? '1s' : '0.4s',
                        transitionTimingFunction: 'ease-in',
                        transitionDelay: textState ? '0.9s' : '0.2s'
                    }}
                >
                    LINK
                </Link>
            </div>
        </animated.div>
        <animated.div 
            className='z-30 absolute top-0 left-1/2 w-4/5'
            style={{
                transform: scrollYProgress.to(scrollY => {
                    if(scrollY * page > 5 && scrollY * page <= 8){
                        return `translateX(-50%) translateY(${100 - ((scrollY * page - 5) * 25)}vh)`
                    }
                    if(scrollY * page > 8 && scrollY * page <= 10){
                        return `translateX(-50%) translateY(25vh)`
                    }
                    if(scrollY * page > 10 && scrollY * page <=12){
                        return `translateX(-50%) translateY(${25 - ((scrollY * page - 10) * 62.5)}vh)`
                    }
                    if(scrollY * page > 12){
                        return `translateX(-50%) translateY(-100vh)` 
                    }
                    return `translateX(15vw) translateY(100vh)`
                })
            }}
        >
            <h1 
                className='text-white text-8xl font-bold font-sans sm:text-4xl'
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                MY WORK
            </h1>
            <div className='flex items-center' >
                <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <h1 className='text-white text-6xl font-bold font-sans sm:text-3xl'>Project</h1>
                    <h1 className='text-white text-6xl font-bold font-sans sm:text-3xl'>Name</h1>
                </div>
                <div 
                    className='text-white text-9xl font-bold font-sans strokeNohover sm:text-5xl'
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    方陣出借系統
                </div>
            </div>
            <div>
                <h1 
                    className='text-white text-7xl font-bold font-sans strokeNohover sm:text-3xl'
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    DESCRIPTION
                </h1>
                <p className='text-white text-2xl font-bold font-sans w-96 sm:text-base sm:w-64' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>先前公司內出借工具主要以紙本出借為主，此系統以數位方式解決傳統紙本出借費時費力與管理的問題，達到數位化控管與出借管理。</p>
                <Link
                    href='https://management-system-plum.vercel.app'
                    className='text-white text-3xl font-bold font-sans w-96 stroke '
                    style={{
                        opacity: textState ? '1' : '0',
                        transition: 'opacity',
                        transitionDuration: textState ? '1s' : '0.4s',
                        transitionTimingFunction: 'ease-in',
                        transitionDelay: textState ? '0.9s' : '0.2s'
                    }}
                >
                    LINK
                </Link>
            </div>
        </animated.div>
        <SideProjectComponent />
        <ContactComponent />
        <Experience textState={textState}/>
        <Link 
            className='z-30 absolute bottom-0 left-0 ml-40 text-white text-5xl font-sans mb-16 font-bold stroke sm:ml-4 sm:text-3xl lg:ml-10'
            href={
                webConact > 2 ? 'https://social-media-frontend-k77k.onrender.com' : 'https://admin-frontend-swvv.onrender.com'
            }
            style={{
                display: webConact > 0 ? 'block' : 'none',
                opacity: webConact > 1 ? '1' : '0',
                transition: 'opacity',
                transitionDuration: '1s',
                transitionTimingFunction: 'ease-in',
            }}
        >
            Website Link
        </Link>
    </animated.div>
  )
}

export default WorkComponent