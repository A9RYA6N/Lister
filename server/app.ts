import express from 'express'
import cors from 'cors'
import userRoutes from './src/routes/userRoutes'
import cookieParser from 'cookie-parser'
const app=express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/user', userRoutes)

export default app