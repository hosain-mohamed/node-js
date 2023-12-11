import AppError from "../utils/app.error.js";
import { ALREADY_EXISTS } from "../utils/http.message.text.js";
import { FAIL } from "../utils/http.status.text.js";

export function requestWrapper(functionToHandle) {
  return async (req, res, next) => {
    try {
      await functionToHandle(req, res, next);
    } catch (error) {
      console.log(error);
      if (error.code === 11000 && error.keyValue) {
        const field = Object.keys(error.keyValue)[0];
        const value = error.keyValue[field];
        if (field && value)
          error = new AppError(
            400,
            { [field]: `${value} ${ALREADY_EXISTS}` },
            FAIL
          );
      }
      next(error);
    }
  };
}
