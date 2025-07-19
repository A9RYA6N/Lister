import { Response, Request } from "express";
import '../types/express'
import prisma from "../../prismaClient";

const addTask=async(req: Request, res: Response)=>{
    const {task}=req.body;
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const id=req.user.id;
    try {
        const result=await prisma.list.create({
            data:{
                user_id:id,
                task:task
            }
        })
        console.log(result)
        res.status(200).json({success: true, data:result, message:"Task created"})
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message:"Error adding task", error})
    }
}

const deleteTask=async(req: Request, res: Response)=>{
    const {id}=req.body;
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const result=await prisma.list.delete({
            where:{id}
        })
        console.log(result)
        res.status(200).json({success:true, message:"Task deleted"})
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message:"Error deleting task", error})
    }
}

const getTask=async(req: Request, res: Response)=>{
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const id=req.user.id;
    try {
        const result=await prisma.list.findMany({
            where:{user_id:id}
        })
        console.log(result)
        res.status(200).json({success:true, data:result, message:"Got tasks"})
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message:"Error getting task", error})
    }
}

const updateTask=async(req: Request, res: Response)=>{

}

export {addTask, deleteTask, getTask, updateTask}