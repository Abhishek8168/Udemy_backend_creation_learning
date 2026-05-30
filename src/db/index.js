import mongoose from "mongoose"

// mongoose.connect(process.env.MONGO_URI) // this can have lot of errors so we used try catch block

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected")
    }catch(error){
        console.error("❌ MongoDB connection error", error);
        process.exit(1);
    }
}

export default connectDB; 
// to import in other files: import connectDB from "./db/index.js"
