import express from 'express'
import cors from 'cors'
import userRoutes from './src/routes/userRoutes'
import cookieParser from 'cookie-parser'
const app=express()

app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())

app.use('/api/user', userRoutes)

export default app