import { EMAIL_ALREADY_EXISTS } from "../../../../utils/http.message.text.js";
import userModel from "./user.model.js";
import AppError from "../../../../utils/app.error.js";
import getPaginatedItems from "../../../../utils/get.paginated.items.js";

class MongoUserController {
  // get user
  async getUser(req, res, next) {
    const { id } = req.params;
    return await userModel.findById(id);
  }

  // get current user
  async getCurrentUser(req, res, next) {
    const { user } = req;
    user.password = undefined;
    return user;
  }

  // get users
  async getUsers(req, res, next) {
    const users = getPaginatedItems(userModel, req, "users");
    return users;
  }

  // delete user
  async deleteUser(req, res, next) {
    const { id } = req.params;
    return await userModel.findByIdAndDelete(id);
  }

  // edit user
  async editUser(req, res, next) {
    const { id } = req.params;
    const data = req.body;

    // check if the email is already taken
    if (data.email) {
      const existingUser = await userModel.findOne({ email: data.email });
      if (existingUser) {
        throw new AppError(409, EMAIL_ALREADY_EXISTS);
      }
    }
    // update user
    return await userModel.findByIdAndUpdate(id, { ...data }, { new: true });
  }
}

export default MongoUserController;
