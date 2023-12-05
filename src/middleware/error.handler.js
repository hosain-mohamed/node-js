import * as httpStatus from "../utils/http.status.text.js";
import * as httpMessages from "../utils/http.message.text.js";

function handleNonExistingRoutes(req, res) {
  res.status(404).json({
    status: httpStatus.ERROR,
    message: httpMessages.ROUTE_NOT_FOUND,
  });
}

function handleErrors(error, req, res, next) {
  res.status(error.statusCode || 500).json({
    status: error.status || httpStatus.ERROR,
    ...(error.message ? { message: error.message } : {}),
    ...(!error.data ? {} : { data: error.data }),
  });
}
export { handleNonExistingRoutes, handleErrors };
