import express from "express";
import {
  removeCartItem,
  getCartItems,
  addCartItem,
} from "../controllers/cart_controller.js";

import authmiddleware from "../middleware/auth_middleware.js";

const router = express.Router();

router.get("/", authmiddleware, getCartItems);
router.post("/", authmiddleware, addCartItem);
router.delete("/:productId", authmiddleware, removeCartItem);

export default router;
