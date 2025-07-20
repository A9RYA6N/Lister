import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router';
const Login = () => {
    const navigate=useNavigate()
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [name, setName]=useState('');
    const [error, setError]=useState('');
    const [isLoading, setIsLoading]=useState(false);
    const [isLoggingIn, setIsLoggingIn]=useState(false);

    const handleLogin=async()=>{
        setError('')
        setIsLoading(true)
        try {
            const apiObj={
                email,
                password
            }
            const res= await axios({
                method:"POST",
                url:`${import.meta.env.VITE_USER_API}/login`,
                data:apiObj,
                withCredentials:true
            })
            if(res.status==200)
            {
                console.log(res.data.data)
            }
            navigate('/')
        } catch (error) {
            const err=error as AxiosError
            const status=err.response?.status;
            if(status==400)
            {
                setError('Wrong Password')
            }
            else if(status==401)
            {
                setError("User doesn't exist")
            }
            else{
                setError("Internal server error: "+err.message)
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const handleSignUp=async()=>{
        setError('')
        setIsLoading(true);
        try {
            const apiObj={
                name,
                email,
                password
            }
            const res=await axios({
                method:"POST",
                url:`${import.meta.env.VITE_USER_API}/signup`,
                data:apiObj
            })
            if(res.status==200)
            {
                console.log("User signed up!")
            }
        } catch (error) {
            const err=error as AxiosError;
            const status=err.response?.status;
            if(status==400)
            {
                setError('User exists on thsi email id')
            }
            else{
                setError("Internal server error: "+err.message)
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div className='error'>{error ? error : ""}</div>
            {isLoggingIn ? 
                <div>
                    <input type="email" placeholder='Enter your email' onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input type="password" placeholder='Enter your password' onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button onClick={handleLogin} disabled={isLoading}>Log In</button>
                </div>
            : 
                <div>
                    <input type="text" placeholder='Enter your name' onChange={(e)=>{setName(e.target.value)}}/>
                    <input type="email" placeholder='Enter your email' onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input type="password" placeholder='Enter your password' onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button onClick={handleSignUp} disabled={isLoading}>Sign In</button>
                </div>
            }
            <button onClick={()=>{setIsLoggingIn(i=>!i)}}>{isLoggingIn ? "Don't have an account? Sign Up!" : "Already have an account? Log In!"}</button>
            <button onClick={async()=>{
                await axios({
                    method:"GET",
                    url:`${import.meta.env.VITE_USER_API}/`,
                    withCredentials:true
                }).then((res)=>{console.log(res.data)}).catch((err)=>{console.error(err)})
            }}>Get user</button>
        </div>
    )
}

export default Login
