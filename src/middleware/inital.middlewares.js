import * as errorHandler from "./error.handler.js";
import logger from "../utils/logger.js";
import cors from "cors";

export function loadGlobalMiddlewares(app, express) {
  // logger if in dev mode
  if (process.env.NODE_ENV === "development") {
    app.use(logger);
  }

  // cors
  app.use(cors());

  // middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
}

export function loadErrorMiddlewares(app) {
  //global middleware for non existent routes
  app.all("*", (req, res) => {
    return errorHandler.handleNonExistingRoutes(req, res);
  });

  // global error handler
  app.use((error, req, res, next) => {
    return errorHandler.handleErrors(error, req, res, next);
  });
}
