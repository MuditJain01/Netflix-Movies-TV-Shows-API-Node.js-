import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URI;

export default async function dbConnect () {
    try {
      await mongoose.connect(MONGODB_URL, {
        autoCreate: true,
        autoIndex: true,
      });
      console.log("Database Connection has been established successfully.");
    } catch (error) {
      console.log(`Error in connecting to database`, error);
      throw error;
    }
  };
