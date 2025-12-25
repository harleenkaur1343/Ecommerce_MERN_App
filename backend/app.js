import express from "express";
import cors from "cors";
import authRoutes from "../backend/src/routes/auth_routes.js";
import productRoutes from "../backend/src/routes/product_routes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API checking..");
});

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);


export default app;
