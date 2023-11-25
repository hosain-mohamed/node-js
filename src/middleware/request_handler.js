import * as httpStatus from "../utils/http.status.text.js";

export function requestHandler(functionToHandle) {
  return (req, res, next) => {
    functionToHandle(req, res, next).catch(async (error) => {
      next(error);
    });
  };
}
