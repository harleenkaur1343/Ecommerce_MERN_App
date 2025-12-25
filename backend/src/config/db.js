import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
  } catch (error) {
    console.log("Error in connecting to DB, ", error);
  }
};

export default connectDB;