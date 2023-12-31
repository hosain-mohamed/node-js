import cors from "cors";
import logger from "../utils/logger.js";
import { handleErrors, handleNonExistingRoutes } from "./error.middleware.js";

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
  app.all("*", (req, res, next) => handleNonExistingRoutes(req, res, next));

  // global error handler
  app.use((error, req, res, next) => handleErrors(error, req, res, next));
}
