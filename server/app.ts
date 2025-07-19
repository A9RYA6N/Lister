import express from 'express'
import cors from 'cors'
import userRoutes from './src/routes/userRoutes'
import cookieParser from 'cookie-parser'
import taskRoutes from './src/routes/taskRoutes'

const app=express()

app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/task', taskRoutes)

app.use((req,res)=>{
    res.status(404).send(`<html>
    <head>
        <title>404</title>
    </head>
    <body>
        <h1>PAGE NOT FOUND</h1>
    </body>
</html>`)
})

export default app