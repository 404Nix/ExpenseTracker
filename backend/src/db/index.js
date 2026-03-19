import mongoose from "mongoose";

const mongoDbConnection = async () => {
  try {
    
    if(!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not defined");
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

export default mongoDbConnection;