import { Router } from "express";
const router = Router();
import * as controller from "./product.controller.js";
import * as validator from "./product.validator.js";
import { requestValidator } from "../../middleware/request.validator.js";
import { requestWrapper } from "../../middleware/request.wrapper.js";
import { verifyToken } from "../../middleware/verify.token.js";
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
  verifyToken,
  requestValidator(validator.addProduct),
  requestWrapper(controller.addProduct)
);

// update Product
router.put(
  "/:id",
  verifyToken,
  requestValidator(validator.updateProduct),
  requestWrapper(controller.updateProduct)
);

// delete product
router.delete(
  "/:id",
  verifyToken,
  requestValidator(validator.deleteProduct),
  requestWrapper(controller.deleteProduct)
);

export default router;
