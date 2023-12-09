import dotenv from "dotenv";
import express from "express";
import di from "./di.js";
import { loadRoutes } from "./src/routes.js";
import * as initialMiddlewares from "./src/middleware/inital.middlewares.js";

// use env
dotenv.config();

// app
const app = express();

// middlewares
initialMiddlewares.loadGlobalMiddlewares(app, express);

// load routes
loadRoutes(app);

// load error middlewares
initialMiddlewares.loadErrorMiddlewares(app);

// Start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// DB Connection
const dbConnection = di.dbConnection;
dbConnection.connect();
