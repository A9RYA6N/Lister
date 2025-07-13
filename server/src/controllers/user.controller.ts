import { Response, Request } from "express"
import {client} from '../database/db'
import bcrypt, { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Result } from "pg"

const generateAccessToken=(id: number)=>{
    return jwt.sign({id: id}, process.env.JWT_SECRET||'mhasdnhgvasdmhgv')
}

const login=async(req: Request, res: Response)=>{
    const {email, password}=req.body
    try {
        const result= await client.query('select id, email, password from users where email=$1', [email])
        if(result){
            const savedPassword=result.rows[0]['password']
            const isPwdMatching=await bcrypt.compare(password, savedPassword)
            if(isPwdMatching){
                const token=generateAccessToken(result.rows[0]['id'])
                res.status(200).json({success:true, data:token})
            }
            else{
                res.status(400).json({success:false, message:"Wrong Password"})
            }
        }
        else{
            res.status(401).json({success:false, message:"User doesnt exist"})
        }
    } catch (error) {
        console.error('Login error', error)
        res.status(500).json({success:false, message:"Error logging in "+error})
    }
}

const signUp=async(req: Request, res: Response)=>{
    const {name, email, password}=req.body
    const salt=await bcrypt.genSalt(10)
    console.log(salt)
    const hashed_password=await bcrypt.hash(password, salt)
    if(!hashed_password){
        res.status(500).json({success:false, message:"Error hashing password"})
        process.exit(1)
    }
    else{
        try {
            await client.query('Insert into users(email, password, name) values ($1, $2, $3)', [email, hashed_password, name])
            console.log("User signed up")
            res.status(200).json({success:true, message:"User successfully signed in"})
        } catch (error) {
            console.error('Sign in error', error)
            res.status(500).json({success:false, message:"Error signing in "+error})
        }
    }
}

const getUser=async(req: Request, res: Response)=>{

}

const deleteUser=async(req: Request, res: Response)=>{

}

const logout=async(req: Request, res: Response)=>{

}

const editUser=async(req: Request, res: Response)=>{

}

export {login, signUp}