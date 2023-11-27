import { Joi } from "../../middleware/validation.middleware.js";

// Auth validator
export const register = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required().min(3).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(50),
  }),
};

export const login = {
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(50),
  }),
};
