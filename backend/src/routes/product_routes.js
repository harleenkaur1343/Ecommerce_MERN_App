import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  uploadProductImages,
} from "../controllers/product_controller.js";
import authmiddleware from "../middleware/auth_middleware.js";
import allowedRoles from "../middleware/role_middleware.js";
import upload from "../middleware/upload_middleware.js";

const router = express.Router();

router.post(
  "/createproduct",
  authmiddleware,
  allowedRoles("ADMIN"),
  createProduct
);

router.post(
  "/uploadimage/:id",
  authmiddleware,
  allowedRoles("ADMIN"),
  upload.array("images", 5),
  uploadProductImages
);

router.get("/products", getAllProducts);

router.put("/:id", authmiddleware, allowedRoles("ADMIN"), updateProduct);

router.delete("/:id", authmiddleware, allowedRoles("ADMIN"), deleteProduct);

export default router;
