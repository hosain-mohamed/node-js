import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import di from "./di.js";
import * as errorHandler from "./src/middleware/error.handler.js";
import { loadRoutes } from "./src/routes.js";

// use env
dotenv.config();

// app
const app = express();

// cors
app.use(cors());

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// load routes
loadRoutes(app);

//global middleware for non existent routes
app.all("*", (req, res) => {
  return errorHandler.handleNonExistingRoutes(req, res);
});

// global error handler
app.use((error, req, res, next) => {
  return errorHandler.handleErrors(error, req, res, next);
});

// server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// DB
const dbConnection = di.dbConnection;
dbConnection.connect();
