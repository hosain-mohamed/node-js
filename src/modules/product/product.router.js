import { Router } from "express";
const router = Router();
import * as controller from "./product.controller.js";
import * as validator from "./product.validator.js";
import { validationSchema } from "../../middleware/validation.middleware.js";
import { requestHandler } from "../../utils/error_handler.js";
// get Products
router.get(
  "/",
  validationSchema(validator.getProducts),
  controller.getProducts
);

// getProductDetails
router.get(
  "/:id",
  validationSchema(validator.productDetails),
  requestHandler(controller.getProduct)
);

// add Product
router.post(
  "/",
  validationSchema(validator.addProduct),
  requestHandler(controller.addProduct)
);

// update Product
router.put(
  "/:id",
  validationSchema(validator.updateProduct),
  requestHandler(controller.updateProduct)
);

// delete product
router.delete(
  "/:id",
  validationSchema(validator.deleteProduct),
  requestHandler(controller.deleteProduct)
);

export default router;
