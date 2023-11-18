import joi from "joi";

// Validations for product details
export const productDetails = {
  params: joi.object({
    id: joi.number().required(),
  }),
};

// Validations for add product
export const addProduct = {
  body: joi.object({
    name: joi.string().required().min(3).max(50),
    price: joi.number().required(),
  }),
};

// Validations for update product
export const updateProduct = {
  body: joi
    .object({
      name: joi.string().min(3).max(50),
      price: joi.number(),
    })
    .min(1),
  params: joi.object({
    id: joi.number().required(),
  }),
};

// validation for delete product
export const deleteProduct = {
  params: joi.object({
    id: joi.number().required(),
  }),
};
