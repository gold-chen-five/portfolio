'use client'
import { page } from './contant.js'
import dynamic from 'next/dynamic';
import Load from './scenes/load/Load.js';
import IntroComponent from './scenes/IntroComponent.js'
import WorkComponent from './scenes/WorkComponent.js'
import ConactCard from './scenes/ConactCard.js'
import IntroButton from './scenes/IntroButton.js'
import IntroduceText from './scenes/IntroduceText.js'
import Cursor from './scenes/cursor/Cursor.js'
import './page.css'
import { useRef, Suspense, useEffect, useState } from 'react'
import { useMediaQuery } from './zustand/state.js';

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [pageComplete, setPageComplete] = useState(false)
  const {mediaQuery, setMediaQuery} = useMediaQuery()
  const cursor = useRef()
  const handleMouseMove = (e) => { 
    if(mediaQuery) return
    if(!loading){
      cursor.current.style.top = e.clientY + 'px'
      cursor.current.style.left = e.pageX + 'px'
    }
    
  }

  useEffect(() => {
    setMediaQuery(window.matchMedia('(max-width: 1024px)').matches)
    window.addEventListener('resize',() =>{
      setMediaQuery(window.matchMedia('(max-width: 1024px)').matches)
    })
  },[])
  
  useEffect(() => {
    const handelPageComplete = () => setPageComplete(true);
    // if( document.readyState === 'complete'){
    //   handelPageComplete()
    // }else{
    //   window.addEventListener("load", handelPageComplete);
    //   return window.removeEventListener("load", handelPageComplete);
    // }
    handelPageComplete()
    
  }, [])

  return (
    <main 
      className='w-full bg-black' style={{height: `${100 * page}vh`}}
      onMouseMove={(e) => handleMouseMove(e)}
    >
      {/* <div style={{height: `300vh`}}></div> */}
      { loading && <Load pageComplete={pageComplete} setLoading={setLoading}/>}
      <IntroComponent />
      <WorkComponent />
      <ConactCard />
      <IntroButton />
      <IntroduceText />
            
      { !mediaQuery && <Cursor cursor={cursor} pageComplete={pageComplete} loading={loading}/>}
      
    </main>
  )
}
