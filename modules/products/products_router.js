import { Router } from "express";
const router = Router();
import * as controller from "./products_controller.js";
import * as validator from "./products_validator.js";
import { validationSchema } from "../../middleware/validation_middleware.js";
import { requestHandler } from "../../utils/error_handler.js";
// get Products
router.get("/", requestHandler(controller.getProducts));

// getProductDetails
router.get(
  "/:id",
  validationSchema(validator.productDetails),
  requestHandler(controller.getProductDetails)
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
