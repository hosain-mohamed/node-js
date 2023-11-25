import joi from "joi";
import * as httpStatus from "../utils/http.status.text.js";

export const Joi = joi.defaults((schema) => {
  return schema.options({
    errors: {
      wrap: {
        // Remove quotes from variable names in error messages
        label: false,
      },
    },
  });
});

const reqValues = ["body", "params", "query"];

export const validationSchema = (schema) => {
  return (req, res, next) => {
    const errors = [];
    reqValues.forEach((value) => {
      const schemaToValidate = schema[value];
      if (!schemaToValidate) return;
      const reqValue = req[value];
      const { error } = schemaToValidate.validate(reqValue, {
        abortEarly: false,
      });
      if (error) {
        const { details } = error;
        details.map((i) => {
          const message = { [i.context.label]: i.message };
          errors.push(message);
        });
      }
    });
    if (errors.length) {
      return res.status(400).json({
        status: httpStatus.FAIL,
        data: errors,
      });
    }
    next();
  };
};
