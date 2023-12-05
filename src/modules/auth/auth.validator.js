import { Joi } from "../../middleware/request.validator.js";

// Auth validator
export const register = {
  body: Joi.object({
    firstName: Joi.string().required().min(3).max(50),
    lastName: Joi.string().required().min(3).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(50),
    role: Joi.string().valid("user", "admin"),      
    avatar: Joi.string(),
  }),
};

export const login = {
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(50),
  }),
};
