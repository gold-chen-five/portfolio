'use client'
import { useEffect, useState } from "react"

export default function loading({pageComplete, setLoading}){
    useEffect(() => {
        if(pageComplete){
            setTimeout(() => {setLoading(false)},2000)
        }
    },[pageComplete])
    return (
        <div 
            className="fixed z-[100] top-0 left-0 w-full h-screen bg-black text-white flex justify-center items-center"
            
        >
            <p 
                className="font-bold font-sans text-5xl strokeNohover"
                style={{
                    opacity: pageComplete ? '0' : '1',
                    transition: 'all 0.5s ease-in',
                }}
            >
                LOADING...
            </p>
        </div>
    )
}