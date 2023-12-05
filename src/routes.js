// routes

import productRouter from "./modules/product/product.router.js";
import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
import { verifyToken } from "./middleware/verify.token.js";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const oringalPath = path.resolve(__dirname, "../");

// load routes
export function loadRoutes(app) {
  app.use("/uploads", express.static(path.join(oringalPath, "uploads")));
  app.use("/api/products", productRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/users", verifyToken, userRouter);
}
