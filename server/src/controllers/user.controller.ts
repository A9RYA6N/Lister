import { Response, Request } from "express"
import bcrypt, { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import '../types/express'
import { Result } from "pg"
import prisma from "../../prismaClient"

const generateAccessToken=(id: number)=>{
    return jwt.sign({id: id}, process.env.JWT_SECRET||'mhasdnhgvasdmhgv')
}

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none" as const, //Explains to ts that "none" is a type literal and not a string
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10), // ~10 years
};

const login=async(req: Request, res: Response)=>{
    const {email, password}=req.body
    try {
        const result=await prisma.users.findMany({
            where:{email}
        })
        if(result){
            const savedPassword=result[0]['password']
            const isPwdMatching=await bcrypt.compare(password, savedPassword)
            if(isPwdMatching){
                const token=generateAccessToken(result[0]['id'])
                res.status(200).cookie("accessToken", token, cookieOptions).json({success:true, data:token})
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
    const isPresent=await prisma.users.findMany({
        where:{email}
    })
    if(isPresent.length==0?false:true){
        res.status(400).json({success:false, message:"User exists"})
        return
    }
    const salt=await bcrypt.genSalt(10)
    console.log(salt)
    const hashed_password=await bcrypt.hash(password, salt)
    if(!hashed_password){
        res.status(500).json({success:false, message:"Error hashing password"})
        return
    }
    else{
        try {
            const user = await prisma.users.create({
                data:{
                    email,
                    password: hashed_password,
                    name
                }
            })
            console.log("User signed up")
            res.status(200).json({success:true, message:"User successfully signed in"})
        } catch (error) {
            console.error('Sign in error', error)
            res.status(500).json({success:false, message:"Error signing in "+error})
        }
    }
}

const getUser=async(req: Request, res: Response)=>{
   res.status(200).json({success: true, data: req.user, message:"User got"})
}

const deleteUser=async(req: Request, res: Response)=>{

}

const logout=async(req: Request, res: Response)=>{

}

const editUser=async(req: Request, res: Response)=>{

}

export {login, signUp, getUser, deleteUser, logout, editUser}