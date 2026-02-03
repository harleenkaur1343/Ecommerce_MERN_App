import Users from "../models/user_model.js";
import bcrypt from "bcryptjs";
import { request } from "express";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: "Please verify your account" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    //for accessing protecting routes
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
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const logout = async (req, res) => {
  //undefined
  // const { refreshToken } = req.body;

  const refreshToken = req.cookies.refreshToken;
  console.log("Refhresh cookie",refreshToken);


  await Users.findOneAndUpdate({ refreshToken }, { refreshToken: null });

  //remove the cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  console.log("After clearing", req.cookies.refreshToken);
  res.status(200).json({ message: "Logged out noe successfully" });
};
