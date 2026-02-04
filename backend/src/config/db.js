// import mongoose, { connect } from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI)
//   } catch (error) {
//     console.log("Error in connecting to DB, ", error);
//   }
// };

// export default connectDB;
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // This forces Node.js to use IPv4 instead of the Google IPv6 address you saw
      family: 4 
    });
   // console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;