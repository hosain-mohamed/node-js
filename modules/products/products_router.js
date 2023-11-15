import { Router } from "express";
const router = Router();
import * as controller from "./products_controller.js";
import * as productsValidator from "./products_validator.js";
import { validationSchema } from "../../middleware/validation_middleware.js";
import { requestHandler } from "../../utils/error_handler.js";
// get Products
router.get("/", requestHandler(controller.getProducts));

// getProductDetails
router.get(
  "/:id",
  validationSchema(productsValidator.productDetails),
  requestHandler(controller.getProductDetails)
);

// add Product
router.post(
  "/",
  validationSchema(productsValidator.addProduct),
  requestHandler(controller.addProduct)
);

// update Product
router.put(
  "/:id",
  validationSchema(productsValidator.updateProduct),
  requestHandler(controller.updateProduct)
);

// delete product
router.delete(
  "/:id",
  validationSchema(productsValidator.deleteProduct),
  requestHandler(controller.deleteProduct)
);

export default router;
