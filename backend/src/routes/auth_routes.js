import express from "express";
import { register} from "../controllers/auth_controller.js";
import { login, logout } from "../controllers/login_controller.js";
import authmiddleware from "../middleware/auth_middleware.js";
import allowedRoles from "../middleware/role_middleware.js";
const router = express.Router();

router.post("/register", register);
// router.post("/verify_otp", verifyOtp);
// router.post("/resend-otp",resendOTP)
router.post("/login", login);
router.post("/logout", logout);

// router.get("/refresh-token", );

router.get(
  "/protected/admin",
  authmiddleware,
  allowedRoles("ADMIN"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  },
);

export default router;
