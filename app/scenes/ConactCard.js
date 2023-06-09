'use client'
import {useState, useEffect} from 'react'
import { roboto, vidaloka } from '../fonts.js'
import { useScroll, animated } from '@react-spring/web'
import { page } from '../contant.js'
import { useCard } from '../zustand/state.js'
import { useEmailSend } from '../hooks/useEmailSend.js'

function ConactCard() {
  const { scrollYProgress } = useScroll()
  const [transformClick, setTransformClick] = useState(true)
  const { setCardBackSide } = useCard()
  const { isLoading, isError, isSend, status,setStatus, handleSendEmail} = useEmailSend()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    const backface = document.getElementById("backface")
    backface.addEventListener('click', (event) => {
        if(event.target == backface){
            setTransformClick(true)
            setCardBackSide(false)
        }
    })
  },[])

  const handleSendOnclick = async () => {
    if(name.length === 0 || email.length === 0 || text.length === 0)  return 
    if(status !== 'typing')  return
    await handleSendEmail(name, email, text)
  }

  useEffect(() => {
    if(status === 'finish' || status === 'error'){
        setName('')
        setEmail('')
        setText('')
        setTimeout(() => setStatus('typing'), 1500)
    }
  },[status])
  return (
    <animated.div
        className=' fixed top-1/2 left-12 -translate-y-1/2 sm:w-10/12 sm:top-1/3 sm:left-1/2 sm:-translate-x-1/2 lg:w-1/2 lg:top-1/3 lg:left-1/2 lg:-translate-x-1/2'
        style={{
            transition: 'opacity 1s ease-in',
            opacity: scrollYProgress.to(scrollY => {
                if(scrollY * page > 16.5)  return '1'
                return '0'
            }),
            zIndex: scrollYProgress.to(scrollY => {
                if(scrollY * page > 16.5)  return '70'
                return '10'
            }),
        }}
    >
        <div 
            className='h-[170px] w-[340px] relative sm:w-full lg:w-full'
            style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 2s ease-in-out, opacity 1s ease-in',
                transform: `perspective(500px) ${ transformClick ? 'rotateY(0deg)' : 'rotateY(180deg)'}`,
                
            }}
        >
            <div 
                onClick={() => {
                    setTransformClick(!transformClick)
                    setCardBackSide(true)
                }}
                className="h-full w-full bg-[url('/images/biz_background.png')] bg-center bg-cover bg-no-repeat absolute"
                style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    transform: 'perspective(500px) rotateY(0deg)'
                }}
            >
                <div 
                    className='text-black absolute top-1/2 left-1/2 text-xs'
                    style={{
                        transform: 'perspective(500px) translateZ(20px) translateX(-50%) translateY(-50%)'
                    }}
                >
                    CONTACT ME
                </div> 
                <p className='absolute top-0 left-0 pt-2 pl-2 text-black text-xs vidaloka.className font-bold'>Portfolio</p>
                <p className='absolute top-0 right-0 pt-2 pr-2 text-black text-xs vidaloka.className font-bold'>Click Me</p>
                <p className='absolute bottom-0 left-0 pb-2 pl-2 text-black text-xs vidaloka.className font-bold'>Taiwan,Kaohsiung</p>
                <p className='absolute bottom-0 right-0 pb-2 pr-2 text-black text-xs vidaloka.className font-bold'>Nice Day</p>
            </div>
            <div 
                id='backface'
                className="w-full h-full bg-[url('/images/biz_background.png')] bg-center bg-cover bg-no-repeat absolute flex flex-col justify-center items-center px-10 gap-y-2"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: 'perspective(500px) rotateY(180deg)',
                    transition: '2s ease-in-out',
                    backfaceVisibility: 'hidden',
                }}
            >
                <div className=' flex w-full justify-center items-center'>
                    <p className='text-xs w-1/5 vidaloka.className font-bold'>Name</p>
                    <input 
                        type="text" 
                        className='border-b border-black bg-transparent outline-none w-4/5'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        disabled={status !== 'typing'}
                    />
                </div>
                <div className=' flex w-full justify-center items-center'>
                    <p className='text-xs w-1/5 vidaloka.className font-bold'>Email</p>
                    <input 
                        type="text" 
                        className='border-b border-black bg-transparent outline-none w-4/5'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={status !== 'typing'}
                    />
                </div>
                <div className=' flex w-full justify-center items-center'>
                    <p className='text-xs w-1/5 vidaloka.className font-bold'>Talk</p>
                    <input 
                        type="text" 
                        className='border-b border-black bg-transparent outline-none w-4/5'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        disabled={status !== 'typing'}
                    />
                </div>
                <button 
                    className='text-sm vidaloka.className font-bold border-black'
                    onClick={handleSendOnclick}
                    disabled={status !== 'typing'}
                >
                    { 
                        isLoading ? 'Loading' 
                            : isSend ? 'Send successfull' 
                            : isError ? 'Email not exist' 
                            : 'Send'
                    }
                </button>
            </div>
        </div>
    </animated.div>
    
  )
}

export default ConactCard