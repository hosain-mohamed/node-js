import express from "express";
import di from "./di.js";
import dotenv from "dotenv";
import * as httpStatus from "./src/utils/http_status_text.js";
import * as httpMessages from "./src/utils/http_message_text.js";

const app = express();
dotenv.config();
const port = process.env.PORT;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
import productsRouter from "./src/modules/product/product.router.js";
app.use("/api/products", productsRouter);
app.all("*", (req, res) => {
  res.status(404).json({
    status: httpStatus.ERROR,
    message: httpMessages.ROUTE_NOT_FOUND,
  });
});

// server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// DB
const dbConnection = di.dbConnection;
dbConnection.connect();
