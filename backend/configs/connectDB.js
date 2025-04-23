import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to Database");
  } catch (err) {
    console.error("❌ Error connecting to database:", err);
  }
};

export default connectDB;
