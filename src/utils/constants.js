import { Joi } from "../middleware/validator.middleware.js";

const isDevelpment = process.env.NODE_ENV === "development";
const validateId = Joi.string().hex().length(24).required();

export { isDevelpment, validateId };
