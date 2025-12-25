import express, { request } from "express";
import { register,verifyOtp } from "../controllers/auth_controller.js";
import {login} from "../controllers/login_controller.js"
import authmiddleware from "../middleware/auth_middleware.js";
import allowedRoles from "../middleware/role_middleware.js";


const router = express.Router();

router.post("/register", register);
router.post("/verify_otp",verifyOtp);
router.post("/login",login);

router.get("/protected/admin",authmiddleware,allowedRoles("Admin"),(req,res)=>{
    res.json({message:"Welcome Admin"})
});

export default router;
