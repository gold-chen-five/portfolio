import {useState} from 'react'
import { useScroll,animated } from '@react-spring/web'
import { page } from '../contant'

function SideProjectComponent() {
    const [textState,setTextState] = useState(false)
    const { scrollYProgress } = useScroll({
        onChange: ({ value: { scrollYProgress } }) => {
            if(scrollYProgress * page > 14.5){
                setTextState(true)
            }else{
                setTextState(false)
            }
        },
    })
    return (
        <animated.div 
            className='z-[5] absolute top-1/2 left-0 gap-y-4 flex flex-col -translate-y-1/2 ml-40 sm:ml-4 sm:top-0 sm:-translate-y-0 sm:mt-20 lg:ml-10 lg:top-0 lg:-translate-y-0 lg:mt-20'
            style={{
                opacity: scrollYProgress.to(scrollY => {
                    if(scrollY * page > 12 && scrollY * page <= 15.5)  return '1'
                    if(scrollY * page > 15.5)  return '0'
                    return '0'
                }),
                transition: 'opacity',
                transitionDuration: '1s',
                transitionTimingFunction: 'ease-in',
            }}
        >
            <div>
                <p className='text-gray-100 font-sans text-sm sm:text-xs'>Side project</p>
                <p className='text-white font-sans text-2xl sm:text-xl'>
                    {
                        textState ? 'Social media' : 'Dashboard'
                    }
                </p>
            </div>
            <div>
                <p className='text-gray-100 font-sans text-sm sm:text-xs'>Made by</p>
                <p className='text-white font-sans text-2xl font-bold'>潘宗諭</p>
            </div>
            <div>
                <p className='text-gray-100 font-sans text-sm sm:text-xs'>Tech stack</p>
                <p className='text-white font-sans text-2xl sm:text-xl'>MongoDB & Express & React & Node</p>
            </div>
            <div>
                <p className='text-gray-100 font-sans text-sm sm:text-xs'>Other tech stack</p>
                <p className='text-white font-sans text-2xl sm:text-xl'>Redux toolkit & MUI</p>
            </div>
        </animated.div>
  )
}

export default SideProjectComponent