import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser"
import authRoutes from "../backend/src/routes/auth_routes.js";
import productRoutes from "../backend/src/routes/product_routes.js";
import cartRoutes from "../backend/src/routes/cart_routes.js";
import orderRoutes from "../backend/src/routes/order_routes.js";
import paymentRoutes from "../backend/src/routes/payment_routes.js";
import adminOrder_routes from "../backend/src/routes/adminOrder_routes.js";
import stripeWebhook from "../backend/src/controllers/webhook_controller.js";

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5, //5 attempts in 10 minutes
  message: "Too many attempts. Please try later",
});
const app = express();
//Stripe requires raw request body for signature verification. Using express.json beforehand alters the body and invalidates the signature
app.post(
  "/api/webhook/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());         
app.use(express.urlencoded({ extended: true }));

app.get("/api/", (req, res) => {
  res.send("API checking..");
});

app.use("/api/payment", paymentRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminOrder_routes);
//app.use("/api/auth", authLimiter);
app.use("/api/auth", authRoutes);

export default app;
