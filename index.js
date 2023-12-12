import dotenv from "dotenv";
import express from "express";
import di from "./di.js";
import loadRoutes from "./src/routes.js";
import {
  loadErrorMiddlewares,
  loadGlobalMiddlewares,
} from "./src/middleware/inital.middlewares.js";
import { handleUnhandledRejections } from "./src/middleware/error.middleware.js";

// use env
dotenv.config();

// app
const app = express();

// middlewares
loadGlobalMiddlewares(app, express);

// load routes
loadRoutes(app);

// load error middlewares
loadErrorMiddlewares(app);

// Start server
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// DB Connection
const { dbConnection } = di;
dbConnection.connect();

// Handle unhandled rejections
handleUnhandledRejections(server);
