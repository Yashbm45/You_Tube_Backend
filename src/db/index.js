import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from 'dotenv'

/*`${process.env.URL}/${DB_NAME}`*/
const yash = "yash";
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect("mongodb+srv://Roo:123321123@roo45.ilui6fl.mongodb.net")
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(process.env.URL);
        console.log("MONGODB connection FAILED ",error);
        process.exit(1)
    }
}

export default connectDB