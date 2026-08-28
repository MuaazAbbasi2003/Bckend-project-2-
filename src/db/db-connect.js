import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDb Connection is Succesfull");
  } catch (error) {
    console.log("Error connecting the database ", error);
    process.exit(1);
  }
};

export default connectDB;
