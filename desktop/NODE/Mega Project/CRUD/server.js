import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import productRoutes from "./routes/productRoutes.js";

config();

const app = express();
app.use(json());

// Routes
app.use("/api/products", productRoutes);

// Connect DB & Start Server
connect(process.env.MONGODB_URI, {})
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("DB connection error:", err));
