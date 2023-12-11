// Category router
import { Router } from "express";
const router = Router();
import * as controller from "./category.controller.js";
import * as validator from "./category.validator.js";
import { requestValidator } from "../../middleware/validator.middleware.js";
import { requestWrapper } from "../../middleware/request.wrapper.js";

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
  requestValidator(validator.createCategory),
  requestWrapper(controller.createCategory)
);

// update category
router.put(
  "/:id",
  requestValidator(validator.updateCategory),
  requestWrapper(controller.updateCategory)
);

// delete category
router.delete(
  "/:id",
  requestValidator(validator.deleteCategory),
  requestWrapper(controller.deleteCategory)
);

export default router;