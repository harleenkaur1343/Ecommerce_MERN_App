import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  placeOrder,
  getUserOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", authMiddleware, placeOrder);
router.get("/my-orders", authMiddleware, getUserOrders);

export default router;