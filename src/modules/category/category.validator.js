// Category validator

import { Joi } from "../../middleware/validator.middleware.js";
import { validateId } from "../../utils/constants.js";

// create category
export const createCategory = {
  body: Joi.object({
    name: Joi.string().required().min(3).max(50),
    image: Joi.string(),
  }),
};

// get category
export const getCategory = {
  params: Joi.object({ id: validateId }),
};

// update category
export const updateCategory = {
  body: Joi.object({
    name: Joi.string().min(3).max(50),
  }).or("name"),
  params: Joi.object({ id: validateId }),
};

// delete category
export const deleteCategory = {
  params: Joi.object({ id: validateId }),
};
