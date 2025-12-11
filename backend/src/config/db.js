import monogoose from "mongoose";
import {ENV} from "./env.js";

export const connectDB = async()=>{
  try{
    const conn = await monogoose.connect(ENV.DB_URL)
    console.log(`✅Connected to MONGODB:${conn.connection.host}`)
  } catch (error){
    console.error("💥MONGODB connection error")
    process.exit(1)//exit code  means failure, and 0 is success
  }

}