// routes

import productRouter from "./modules/product/product.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import userRouter from "./modules/user/user.routes.js";
import categroyRouter from "./modules/category/category.routes.js";

import { isAuthenticated } from "./middleware/auth.middleware.js";
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
  app.use("/api/users", isAuthenticated, userRouter);
  app.use("/api/categories", categroyRouter);
}
