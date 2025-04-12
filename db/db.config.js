import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        const dbURI = `${process.env.MONGODB_URI}/movies`;
   
        await mongoose.connect(dbURI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error while connecting to the database:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;
