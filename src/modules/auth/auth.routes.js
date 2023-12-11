// Auth router

import { Router } from "express";
const router = Router();
import * as controller from "./auth.controller.js";
import * as validator from "./auth.validator.js";
import { requestValidator } from "../../middleware/validator.middleware.js";
import { requestWrapper } from "../../middleware/request.wrapper.js";
import upload from "../../utils/upload.avatar.js";

router.post(
  "/register",
  upload.single("avatar"),
  requestValidator(validator.register),
  requestWrapper(controller.register)
);

router.post(
  "/login",
  requestValidator(validator.login),
  requestWrapper(controller.login)
);

export default router;
