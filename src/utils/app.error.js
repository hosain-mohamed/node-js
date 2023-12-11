import { ERROR } from "./http.status.text.js";

class AppError extends Error {
  constructor(statusCode, message, status = ERROR) {
    super(message);
    console.log("status", status);
    this.statusCode = statusCode;
    this.message = status == ERROR ? message : undefined;
    this.status = status;
    this.data = status == ERROR ? undefined : message;
  }
}

export default AppError;
