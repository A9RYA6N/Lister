import {Router} from "express";
import {getUser, login, signUp} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
const router=Router();
router.post('/login',login)
router.post('/signup',signUp)
router.get('/', verifyJWT, getUser)
export default router