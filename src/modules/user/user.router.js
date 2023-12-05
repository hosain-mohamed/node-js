// User router
import { Router } from "express";
import * as validator from "./user.validator.js";
import { requestValidator } from "../../middleware/request.validator.js";
import * as controller from "./user.controller.js";
import { requestWrapper } from "../../middleware/request.wrapper.js";
import { UserRoles } from "../../utils/user_roles.js";
import { permissionTo } from "../../middleware/permission.to.js";
const router = Router();

// get Current User
router.get("/me", requestWrapper(controller.getCurrentUser));

// get User
router.get(
  "/:id",
  requestValidator(validator.getUser),
  requestWrapper(controller.getUser)
);

// get users
router.get(
  "/",
  permissionTo(UserRoles.ADMIN),
  requestWrapper(controller.getUsers)
);

// delete user
router.delete(
  "/:id",
  permissionTo(UserRoles.ADMIN),
  requestValidator(validator.deleteUser),
  requestWrapper(controller.deleteUser)
);

// edit user
router.put(
  "/:id",
  requestValidator(validator.editUser),
  requestWrapper(controller.editUser)
);
export default router;
