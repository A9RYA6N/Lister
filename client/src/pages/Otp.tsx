import {useState, useEffect} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router'
const Otp = () => {
    const navigate=useNavigate()
    const [otp, setOtp]=useState("")
    const [error, setError]=useState('');
    const [isLoading, setIsLoading]=useState(false);
    const [email, setEmail]=useState('');
    const [id, setId]=useState(0);
    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const res=await axios({
                    method:"GET",
                    url:`${import.meta.env.VITE_USER_API}/`,
                    withCredentials: true
                })
                console.log(res)
                setEmail(res.data.data.email)
                console.log(email)
                // setEmail(res.data.data.email)
            } catch (error) {
                setError("Failed to fetch user")
            }
        }
        fetchUser()
    },[])
    const handleClick=async()=>{
        try {
            setIsLoading(true)
            setError('')
            const result=await axios({
                method: "POST",
                url: `${import.meta.env.VITE_USER_API}/verify`,
                data:{
                    email,
                    id,
                    userOtp:otp},
                withCredentials: true
            })
            if(result.status==200){
                navigate('/')
            }
        } catch (error) {
            const err=error as Error
            setError(err.message)
        }
        finally{
            setIsLoading(false)
        }
    }
    return (
        <div>
            {error ? <p>{error}</p> : ""}
            {!email ? <p>Loading user info...</p> : 
            <><input type="number" maxLength={4} placeholder='Enter otp' onChange={(e)=>{setOtp(e.target.value)}}/>
            <button onClick={handleClick} disabled={isLoading}>Submit</button>
            </>}
        </div>
    )
}

export default Otp
