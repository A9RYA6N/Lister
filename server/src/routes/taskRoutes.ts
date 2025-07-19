import { Router } from "express";
import { addTask, deleteTask, getTask, updateTask } from "../controllers/task.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router=Router();

router.post('/', verifyJWT, addTask)
router.get('/', verifyJWT, getTask)
router.delete('/', verifyJWT, deleteTask)
router.put('/', verifyJWT, updateTask)

export default router