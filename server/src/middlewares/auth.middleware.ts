import jwt from "jsonwebtoken";
import { client } from "../database/db";
import { Request, Response, NextFunction } from "express";
import '../types/express'

const verifyJWT=async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const token=req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ','')
        if(!token){
            res.status(401).json({success:false, message:'Unauthorized request'})
            return
        }
        const decodedToken=jwt.verify(token, process.env.JWT_SECRET || 'mhasdnhgvasdmhgv') as any
        const result= await client.query('select id, email, name from users where id=$1', [decodedToken.id])
        if(!result){
            res.status(401).json({success: false, message:'Invalid token request'})
            return
        }
        req.user=result.rows[0]
        //I have to create user for express????
        next()
    } catch (error) {
        res.status(500).json({success:false, message:'Error validating token '+error})
    }
}
export {verifyJWT}