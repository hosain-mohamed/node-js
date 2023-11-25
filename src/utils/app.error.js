class AppError extends Error {
  constructor(statusCode, message, status, data) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.status = status;
    this.data = data;
  }
}

export default AppError;
