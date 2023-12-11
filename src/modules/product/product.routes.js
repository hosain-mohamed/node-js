import { Router } from "express";
const router = Router();
import * as controller from "./product.controller.js";
import * as validator from "./product.validator.js";
import { requestValidator } from "../../middleware/validator.middleware.js";
import { requestWrapper } from "../../middleware/request.wrapper.js";
import {
  UserRoles,
  permissionTo,
} from "../../middleware/permission.middleware.js";
import { isAuthenticated } from "../../middleware/auth.middleware.js";
import { uploadImages } from "../../utils/upload.images.js";
// get Products
router.get(
  "/",
  requestValidator(validator.getProducts),
  requestWrapper(controller.getProducts)
);

// getProductDetails
router.get(
  "/:id",
  requestValidator(validator.productDetails),
  requestWrapper(controller.getProduct)
);

// add Product
router.post(
  "/",
  isAuthenticated,
  permissionTo(UserRoles.ADMIN),
  uploadImages().single("image"),
  requestValidator(validator.addProduct),
  requestWrapper(controller.addProduct)
);

// update Product
router.put(
  "/:id",
  isAuthenticated,
  permissionTo(UserRoles.ADMIN),
  requestValidator(validator.updateProduct),
  requestWrapper(controller.updateProduct)
);

// delete product
router.delete(
  "/:id",
  isAuthenticated,
  permissionTo(UserRoles.ADMIN),
  requestValidator(validator.deleteProduct),
  requestWrapper(controller.deleteProduct)
);

export default router;
