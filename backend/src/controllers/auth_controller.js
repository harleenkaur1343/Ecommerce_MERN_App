import Users from "../models/user_model.js";
import bcrypt from "bcryptjs";
//import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    //console.log(req.body);
    const { name, email, password } = req.body;

    //check if alredy exists then throw error
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    //check pas strength
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      });
    }

    //now hash the pass

    const salt = await bcrypt.genSalt(10);
    const hashedPassord = await bcrypt.hash(password, salt);

    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await Users.create({
      name,
      email,
      password: hashedPassord,
      // otp,
      // otpExpiry,
    });
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );
    //for
    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, //so that it cannot be accessed by js
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict", //check for other vals
      //secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
      message: "User registered successfully",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    //     const htmlTemplate = (otpgen) => `
    // <div style="font-family:Arial,sans-serif;line-height:1.5;color:#333;">
    //   <h2>Verify Your NuraSkin Account</h2>
    //   <p>Your One-Time Password (OTP) is:</p>
    //   <h1 style="letter-spacing:6px;">${otpgen}</h1>
    //   <p>This code expires in 10 minutes.</p>
    // </div>
    // `;
    // await sendEmail(email, "Verify your account", htmlTemplate(otp));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
      message: "In register controller - Server error",
    });
    //sending only error in json strips the content inside
  }
};

// export const verifyOtp = async (req, res) => {
//   try {
//     const { otp, email } = req.body;
//     const user = await Users.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.isVerified) {
//       return res.status(400).json({ message: "User is already verified" });
//     }
//     //otp expiration check or invalid otp
//     if (!user.otp || !user.otpExpiry || !otp) {
//       return res.status(404).json({ message: "OTP not found" });
//     }

//     if (user.otpExpiry < Date.now()) {
//       return res.status(400).json({ message: "OTP has expired" });
//     }

//     const isValid = otp == user.otp ? true : false;
//     console.log("Is Valid", isValid);
//     if (!isValid) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpiry = undefined;

//     await user.save();
//     res.status(200).json({ message: "Account verified successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// export const resendOTP = async (req, res) => {
//   try {
//     //get the user's email
//     //check if it exists
//     //get the otp from db
//     //change it in db
//     //send the email
//     //send the response

//     const { email } = req.body;

//     const user = await Users.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.isVerified) {
//       return res.status(400).json({ message: "User already verified" });
//     }
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.otp = otp;
//     user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
//     await user.save();

// const htmlTemplate = (otpgen) => `
// <div style="font-family:Arial,sans-serif;line-height:1.5;color:#333;">
//   <h2>Verify Your NuraSkin Account</h2>
//   <p>Your One-Time Password (OTP) is:</p>
//   <h1 style="letter-spacing:6px;">${otpgen}</h1>
//   <p>This code expires in 10 minutes.</p>
// </div>
// `;
//     await sendEmail(email, "Verify your account", htmlTemplate(otp));

//     res.status(200).json({ message: "OTP resent successfully" });
//   } catch (error) {
//     console.error("Resend OTP error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
