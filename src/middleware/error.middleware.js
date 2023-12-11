import * as httpStatus from "../utils/http.status.text.js";
import * as httpMessages from "../utils/http.message.text.js";
import AppError from "../utils/app.error.js";

// hanlde non existing routes
function handleNonExistingRoutes(req, res, next) {
  next(new AppError(404, httpMessages.ROUTE_NOT_FOUND));
}

// handle errors
function handleErrors(error, req, res, next) {
  res.status(error.statusCode || 500).json({
    status: error.status || httpStatus.ERROR,
    ...(error.message ? { message: error.message } : {}),
    ...(!error.data ? {} : { data: error.data }),
  });
}

// handle unhandled rejections
function handleUnhandledRejections(server) {
  process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION! 💥 Shutting down...");
    console.error(err.name, err.message);
    console.error(err.stack);
    server.close(() => {
      process.exit(1);
    });
  });
}
export { handleNonExistingRoutes, handleErrors, handleUnhandledRejections };
