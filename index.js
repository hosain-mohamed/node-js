import express from "express";
import cors from "cors";
import di from "./di.js";
import dotenv from "dotenv";
import * as httpStatus from "./src/utils/http.status.text.js";
import * as httpMessages from "./src/utils/http.message.text.js";

// use env
dotenv.config();

// app
const app = express();

// cors
app.use(cors());

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
import productsRouter from "./src/modules/product/product.router.js";
app.use("/api/products", productsRouter);

//global middleware for non existent routes
app.all("*", (req, res) => {
  res.status(404).json({
    status: httpStatus.ERROR,
    message: httpMessages.ROUTE_NOT_FOUND,
  });
});

// global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.status || httpStatus.ERROR,
    ...(error.message ? { message: error.message } : {}),
    ...(!error.data ? {} : { data: error.data }),
  });
});

// server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// DB
const dbConnection = di.dbConnection;
dbConnection.connect();
