import express from 'express'
import cors from 'cors'
import userRoutes from './src/routes/userRoutes'
const app=express()

app.use(cors())
app.use(express.json())

app.use('/api/user', userRoutes)

export default app