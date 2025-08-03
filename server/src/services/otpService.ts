import nodemailer from 'nodemailer'
// import redis from "redis"
import client from '../../redisClient';
const getOTP=async(email: string)=>{
    const otp=generateOTP()
    await client.set(`otp:${email}`, otp, 'EX', 310)
    console.log(await client.get(`otp:${email}`))
    await sendOTP(email, otp);
}

const generateOTP=()=>{
    const max=999999
    const min=100000
    return Math.floor(Math.random()*(max-min+1))+min;
}

const sendOTP=async(email: string, otp: number)=>{
    try {
        const transporter=nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:465,
            secure:true,
            auth:{
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD
            }
        })
        const mailOptions={
            from: process.env.NODEMAILER_USER,
            to: email,
            subject: "Verify your email",
            html: `<p>Your otp is <strong>${otp}</strong></p>`
        }
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
    }
}
export default getOTP