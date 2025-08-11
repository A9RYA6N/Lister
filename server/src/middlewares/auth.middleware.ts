import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../../prismaClient";
import { Request, Response, NextFunction } from "express";
import '../types/express'

const verifyJWT=async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const token=req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ','')
        if(!token){
            res.status(401).json({success:false, message:'Unauthorized request'})
            return
        }
        const decodedToken=jwt.verify(token, process.env.JWT_SECRET || 'mhasdnhgvasdmhgv') as JwtPayload
        const result=await prisma.users.findUnique({
            where:{id: decodedToken.id}
        })
        if(!result){
            res.status(401).json({success: false, message:'Invalid token request'})
            return
        }
        req.user=result
        //I have to create user for express????
        next()
    } catch (error) {
        res.status(500).json({success:false, message:'Error validating token '+error})
    }
}
export {verifyJWT}