import { Joi } from "../../middleware/validation.middleware.js";

// Validations for product details
export const getProducts = {
  query: Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(1),
  }),
};

export const productDetails = {
  params: Joi.object({
    id: Joi.required(),
  }),
};

// Validations for add product
export const addProduct = {
  body: Joi.object({
    name: Joi.string().required().min(3).max(50),
    price: Joi.number().required(),
  }),
};

// Validations for update product
export const updateProduct = {
  body: Joi.object({
    name: Joi.string().min(3).max(50),
    price: Joi.number(),
  }).or("name", "price"),
  params: Joi.object({
    id: Joi.required(),
  }),
};

// validation for delete product
export const deleteProduct = {
  params: Joi.object({
    id: Joi.required(),
  }),
};
