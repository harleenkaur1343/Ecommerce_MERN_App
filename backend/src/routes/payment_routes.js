import express from "express";
import authmiddleware from "../middleware/auth_middleware.js";
import { createPaymentIntent } from "../controllers/payment_controller.js";

const router = express.Router();

router.post("/create-intent", authmiddleware, createPaymentIntent);

export default router;
