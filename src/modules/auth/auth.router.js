// Auth router

import { Router } from "express";
const router = Router();
import * as authController from "./auth.controller.js";
import * as authValidator from "./auth.validator.js";
import { validationSchema } from "../../middleware/validation.middleware.js";
import { requestHandler } from "../../middleware/request_handler.js";

router.post(
  "/register",
  validationSchema(authValidator.register),
  requestHandler(authController.register)
);

router.post(
  "/login",
  validationSchema(authValidator.login),
  requestHandler(authController.login)
);

export default router;
