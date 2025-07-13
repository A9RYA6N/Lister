import { Client } from "pg";
const client= new Client({
    host:process.env.POSTHOST,
    port:process.env.POSTPORT ? parseInt(process.env.POSTPORT) : 5433,
    user:process.env.POSTUSER,
    password:process.env.POSTPASSWORD,
    database:process.env.POSTDATABASE
})
const connectDb=async()=>{
    try {
        await client.connect();
        console.log("Connected to database")
    } catch (error) {
        console.log("Unable to connect to database")
        process.exit(1);
    }
}
export {connectDb, client}