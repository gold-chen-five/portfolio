import { useState } from "react"

export const useEmailSend = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isSend, setIsSend] = useState(false)

    const handleSendEmail = async (name, email, text) => {
        const data = { name, email, text}
       
        try{
            setIsLoading(true)
            const response = await fetch('/api/sendEmail',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            setIsLoading(false)
            setIsSend(true)
        }
        catch(err){
            setIsLoading(false)
            setIsError(true)
        }
    }

    return { isLoading, isError, isSend, setIsSend, handleSendEmail}
}