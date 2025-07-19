import {Router} from "express";
import {getUser, login, signUp, deleteUser, logout, editUser, getTest} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router=Router();

router.post('/login',login)
router.post('/signup',signUp)
router.get('/', verifyJWT, getUser)
router.delete('/delete', deleteUser)
router.post('/logout', logout)
router.get('/test', getTest)
router.put('/', verifyJWT)

export default router