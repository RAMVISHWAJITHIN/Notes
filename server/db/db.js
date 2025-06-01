import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // ✅ fixed typo here
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error); // ✅ improved log
  }
};

export default mongoDB;

//sgfocTFF1vM9wbUd