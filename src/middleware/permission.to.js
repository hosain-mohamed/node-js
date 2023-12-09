import AppError from "../utils/app.error.js";
import { NO_PERMISSION } from "../utils/http.message.text.js";
import { isAuthenticated } from "./auth.middleware.js";

// check if the user is not allowd to perform an action
export function permissionTo(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      // check if the roles includes the current user
      if (roles.includes(CURRENT_USER) && isSameUserId(req)) return next();
      throw new AppError(403, NO_PERMISSION);
    }
    next();
  };
}

function isSameUserId(req) {
  return req.user._id.toString() === req.params.id;
}

export const UserRoles = {
  ADMIN: "admin",
  USER: "user",
};

export const CURRENT_USER = "currentUser";
