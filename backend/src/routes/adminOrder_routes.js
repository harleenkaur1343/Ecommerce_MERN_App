import express from "express";
import authmiddleware from "../middleware/auth_middleware.js";
import allowedRoles from "../middleware/role_middleware.js";
import {
  getAllOrders,
  updateOrderStatus,
} from "../controllers/adminOrder_controller.js";

const router = express.Router();

router.get("/orders", authmiddleware, allowedRoles("ADMIN"), getAllOrders);
router.put(
  "/orders/:id/status",
  authmiddleware,
  allowedRoles("ADMIN"),
  updateOrderStatus
);

export default router;
