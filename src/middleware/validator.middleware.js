import joi from "joi";
import AppError from "../utils/app.error.js";
import { FAIL } from "../utils/http.status.text.js";

export const Joi = joi.defaults((schema) => schema.options({
    errors: {
      wrap: {
        label: false,
      },
    },
  }));

const reqValues = ["body", "params", "query"];

export const requestValidator = (schema) => (req, res, next) => {
    const errors = {};
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
          errors[i.context.label] = i.message;
          return null; 
        });
      }
    });
    // check if errors is not empty
    if (Object.keys(errors).length > 0) {
      throw new AppError(400, errors, FAIL);
    }

    next();
  };
