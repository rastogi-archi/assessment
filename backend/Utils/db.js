import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log(`MongoDB connected successfully to ${MONGODB_URI}`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        console.warn("Backend will continue running, but database persistence will be unavailable.");
    }
};

export default connectDB;