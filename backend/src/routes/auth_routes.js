import express from "express";
import { register, verifyOtp, logout } from "../controllers/auth_controller.js";
import { login } from "../controllers/login_controller.js";
import authmiddleware from "../middleware/auth_middleware.js";
import allowedRoles from "../middleware/role_middleware.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/register", register);
router.post("/verify_otp", verifyOtp);
router.post("/login", login);
router.post("/logout", logout);

router.get("/refresh-token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(401);
  //expired

  //if not then generate the access token
  //secret, user id
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign({ id: payload._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.json({
      accessToken,
      user: payload.user,
    });
  } catch (error) {
    res.sendStatus(401);
  }
});

router.get(
  "/protected/admin",
  authmiddleware,
  allowedRoles("ADMIN"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  },
);

export default router;
