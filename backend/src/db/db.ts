import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URL as string
    );
    console.log(
      `\nMongoDB connected 🍃 !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log("MONGODB connection FAILED:", error);
      process.exit(1);
    }
  }
};

export default connectDB;
