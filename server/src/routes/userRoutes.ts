import {Router} from "express";
import {getUser, login, signUp, deleteUser, logout, editUser, getTest, checkOTP, testOTP, sendOTPa} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router=Router();

router.post('/login',login)
router.post('/signup',signUp)
router.get('/', verifyJWT, getUser)
router.delete('/delete', deleteUser)
router.get('/logout', logout)
router.get('/test', getTest)
router.put('/', verifyJWT)
router.post('/verify', verifyJWT, checkOTP)
router.post('/test-verify', testOTP)
router.get('/test-otp', sendOTPa)

export default router