import express from "express";
const app = express();
import productsRouter from "./src/modules/product/product.router.js";
const port = 3005;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/api/products", productsRouter);

// server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
