import AppError from "../utils/app.error.js";
import { ALREADY_EXISTS } from "../utils/http.message.text.js";
import { FAIL } from "../utils/http.status.text.js";

function requestWrapper(functionToHandle) {
  return async (req, res, next) => {
    try {
      await functionToHandle(req, res, next);
    } catch (error) {
      console.log(error);
      if (error.code === 11000 && error.keyValue) {
        const field = Object.keys(error.keyValue)[0];
        const value = error.keyValue[field];
        if (field && value)
          next(
            new AppError(400, { [field]: `${value} ${ALREADY_EXISTS}` }, FAIL)
          );
      } else {
        next(error);
      }
    }
  };
}

export default requestWrapper;
