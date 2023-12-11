// Category router
import { Router } from "express";
const router = Router();
import * as controller from "./category.controller.js";
import * as validator from "./category.validator.js";
import { requestValidator } from "../../middleware/validator.middleware.js";
import { requestWrapper } from "../../middleware/request.wrapper.js";
import { isAuthenticated } from "../../middleware/auth.middleware.js";
import {
  UserRoles,
  permissionTo,
} from "../../middleware/permission.middleware.js";
import { uploadImages } from "../../utils/upload.images.js";

// get catgrories
router.get("/", requestWrapper(controller.getCategories));

// get category
router.get(
  "/:id",
  requestValidator(validator.getCategory),
  requestWrapper(controller.getCategory)
);

// create category
router.post(
  "/",
  isAuthenticated,
  permissionTo(UserRoles.ADMIN),
  uploadImages().single("image"),
  requestValidator(validator.createCategory),
  requestWrapper(controller.createCategory)
);

// update category
router.put(
  "/:id",
  isAuthenticated,
  permissionTo(UserRoles.ADMIN),
  requestValidator(validator.updateCategory),
  requestWrapper(controller.updateCategory)
);

// delete category
router.delete(
  "/:id",
  isAuthenticated,
  permissionTo(UserRoles.ADMIN),
  requestValidator(validator.deleteCategory),
  requestWrapper(controller.deleteCategory)
);

export default router;
