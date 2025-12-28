import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createPaymentIntent } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-intent", authMiddleware, createPaymentIntent);

export default router;
