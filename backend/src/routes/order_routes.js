import express from "express";
import authmiddleware from "../middleware/auth_middleware.js";
import {
  placeOrder,
  getUserOrders,
} from "../controllers/order_controller.js";

const router = express.Router();

router.post("/", authmiddleware, placeOrder);
router.get("/my-orders", authmiddleware, getUserOrders);

export default router;