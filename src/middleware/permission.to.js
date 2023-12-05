import AppError from "../utils/app.error.js";
import { NO_PERMISSION } from "../utils/http.message.text.js";

export function permissionTo(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) throw new AppError(403, NO_PERMISSION);
    next();
  };
}
