import { Joi } from "../../middleware/request.validator.js";

// get User
export const getUser = {
  params: Joi.object({
    id: Joi.required(),
  }),
};

// delete user
export const deleteUser = {
  params: Joi.object({
    id: Joi.required(),
  }),
};

// edit user
export const editUser = {
  params: Joi.object({
    id: Joi.required(),
  }),
  body: Joi.object({
    firstName: Joi.string().min(3).max(50),
    lastName: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(50),
    avatar: Joi.string(),
  }).or("firstName", "lastName", "email", "password", "avatar"),
};
