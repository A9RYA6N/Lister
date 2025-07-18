import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import prisma from './prismaClient';

const port=process.env.PORT||8000

const startServer=async()=>{
    try {
        await prisma.$connect();
        console.log("Prisma connected to database")
        app.listen(port,()=>{console.log(`Server running on http://localhost:${port}`)})
    } catch (error) {
        console.log("Failed to start server", error)
        process.exit(1)
    }
}
startServer();