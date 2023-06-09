import { useState } from "react"

export const useEmailSend = () => {
    const [status, setStatus] = useState('typing')

    const handleSendEmail = async (name, email, text) => {
        const data = { name, email, text}
       
        try{
            setStatus('loading')
            const response = await fetch('/api/sendEmail',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            if(response.status !== 200) throw new Error(result)
            setStatus('finish')
        }
        catch(err){
            console.log(err.message)
            setStatus('error')
        }
    }
    const isLoading = status === 'loading'
    const isError = status === 'error'
    const isSend = status === 'finish' 
    return { isLoading, isError, isSend, status, setStatus, handleSendEmail}
}