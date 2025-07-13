import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { connectDb } from './src/database/db';

const port=process.env.PORT||8000

const startServer=async()=>{
    try {
        await connectDb();
        app.listen(port,()=>{console.log(`Server running on http://localhost:${port}`)})
    } catch (error) {
        console.log("Failed to start server", error)
        process.exit(1)
    }
}
startServer();