import { Joi } from "../../middleware/validator.middleware.js";
import { validateId } from "../../utils/constants.js";

// Validations for product details
export const getProducts = {
  query: Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(1),
  }),
};

export const productDetails = {
  params: Joi.object({
    id: validateId,
  }),
};

// Validations for add product
export const addProduct = {
  body: Joi.object({
    name: Joi.string().required().min(3).max(50),
    price: Joi.number().required(),
    image: Joi.string(),
  }),
};

// Validations for update product
export const updateProduct = {
  body: Joi.object({
    name: Joi.string().min(3).max(50),
    price: Joi.number(),
  }).or("name", "price"),
  params: Joi.object({ id: validateId }),
};

// validation for delete product
export const deleteProduct = {
  params: Joi.object({ id: validateId }),
};
