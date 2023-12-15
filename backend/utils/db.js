import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("DB connected successfully!!");
    } catch (error) {
        console.log("DB connection failed!!!");
        process.exit(0);
    }
}

export default connectDB;