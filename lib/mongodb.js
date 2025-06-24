import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const ConnectDB = async () => {
    console.log("Connecting to DB...");  // <-- add this
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Database.");
    } catch (error) {
        console.log("Error connecting to Database:", error);
    }
};
