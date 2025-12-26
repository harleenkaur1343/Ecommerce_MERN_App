import express from "express";
import cors from "cors";
import authRoutes from "../backend/src/routes/auth_routes.js";
import productRoutes from "../backend/src/routes/product_routes.js";
import cartRoutes from "../backend/src/routes/cart_routes.js";
import orderRoutes from "../backend/src/routes/order_routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API checking..");
});

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

export default app;
