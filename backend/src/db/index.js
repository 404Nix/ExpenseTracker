import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const mongoDbConnection = async () => {
  try {
    
    if(!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not defined");
    
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

export default mongoDbConnection;