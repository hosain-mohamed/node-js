// Auth router

import { Router } from "express";
import * as controller from "./auth.controller.js";
import * as validator from "./auth.validator.js";
import { requestValidator } from "../../middleware/validator.middleware.js";
import uploadImages from "../../utils/upload.images.js";
import requestWrapper from "../../middleware/request.wrapper.js";

const router = Router();

router.post(
  "/register",
  uploadImages().single("avatar"),
  requestValidator(validator.register),
  requestWrapper(controller.register)
);

router.post(
  "/login",
  requestValidator(validator.login),
  requestWrapper(controller.login)
);

export default router;
