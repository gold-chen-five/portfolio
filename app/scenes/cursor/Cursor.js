'use client'
import {useEffect, useRef} from 'react'
import { useHover } from '@/app/zustand/state.js'

function Cursor({cursor, pageComplete, loading}) {
    const { hover } = useHover()
    
    return (
        <div 
            className="cursor-outer" 
            ref={cursor} 
            style={{
                width: 
                    pageComplete ? 
                        hover ? '90px' : '60px' 
                            : '450px',
                height: 
                    pageComplete ? 
                        hover ? '90px' : '60px' 
                            : '450px',
                backgroundColor: hover ? 'white' : 'transparent',
                mixBlendMode: hover ? 'difference' : 'normal',
                border: '1px solid white',
                transition: 
                    !loading ? 'width 0.1s ease-in-out, height 0.1s ease-in-out, backgroundColor 0.1s ease-in-out'
                            :  'width 1.2s ease-in 0.6s, height 1.2s ease-in 0.6s',
            }}
        ></div>
    )
}

export default Cursor