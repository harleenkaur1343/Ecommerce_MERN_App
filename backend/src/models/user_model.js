import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

  
    refreshToken:{
      type:String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Users", userSchema);

 // otp: {
    //   type: String,
    // },

    // otpExpiry: {
    //   type: Date,
    // },
    // isVerified: {
    //   type: Boolean,
    //   default: false,
    // },

