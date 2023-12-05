// User user

import { checkValidId } from "../../../../utils/check.valid.mongo.id.js";
import {
  EMAIL_ALREADY_EXISTS,
  NO_PERMISSION,
  USER_ALREADY_EXISTS,
} from "../../../../utils/http.message.text.js";
import userModel from "./user.model.js";
import { UserRoles } from "../../../../utils/user_roles.js";
import AppError from "../../../../utils/app.error.js";
import { FAIL } from "../../../../utils/http.status.text.js";

class MongoUserController {
  // get user
  async getUser(req, res, next) {
    const id = req.params.id;
    return checkValidId(id, async () => {
      return await userModel.findById(id);
    });
  }

  // get current user
  async getCurrentUser(req, res, next) {
    const user = req.user;
    user.password = undefined;
    return user;
  }

  // get users
  async getUsers(req, res, next) {
    const users = await userModel.find({});
    return users;
  }

  // delete user
  async deleteUser(req, res, next) {
    const id = req.params.id;
    return checkValidId(id, async () => {
      return await userModel.findByIdAndDelete(id);
    });
  }

  // edit user
  async editUser(req, res, next) {
    const id = req.params.id;
    const data = req.body;

    // check if the user is not allowd to edit this user
    if (req.user.role !== UserRoles.ADMIN && req.user._id.toString() !== id) {
      throw new AppError(403, NO_PERMISSION);
    }
    // check if the email is already taken
    if (data.email) {
      const existingUser = await userModel.findOne({ email: data.email });
      if (existingUser) {
        throw new AppError(409, "", FAIL, {
          email: EMAIL_ALREADY_EXISTS,
        });
      }
    }

    return checkValidId(id, async () => {
      return await userModel.findByIdAndUpdate(id, { ...data }, { new: true });
    });
  }
}

export default MongoUserController;
