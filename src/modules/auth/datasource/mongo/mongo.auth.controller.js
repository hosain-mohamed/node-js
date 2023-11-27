// Auth mongo controller
import userModel from "../../../user/user.datasource/mongo/user.model.js";
import bcrypt from "bcrypt";
import * as httpMessages from "../../../../utils/http.message.text.js";
import { generateToken } from "../../../../utils/generate_token.js";
import AppError from "../../../../utils/app.error.js";
import * as httpStatus from "../../../../utils/http.status.text.js";

class AuthMongoController {
  async register(req, res, next) {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // if user already exists
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      throw new AppError(409, "", httpStatus.FAIL, {
        user: httpMessages.USER_ALREADY_EXISTS,
      });
    }
    // create user
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // generate token
    const token = await generateToken(user._id);
    // return user without password & token
    return {
      user: { firstName, lastName, email },
      token: token,
    };
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    // check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new AppError(404, "", httpStatus.FAIL, {
        user: httpMessages.USER_NOT_FOUND,
      });
    }
    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new AppError(401, "", httpStatus.FAIL, {
        user: httpMessages.invalidCredentials,
      });
    }

    // generate token
    const token = await generateToken(user._id);

    // return user without password & token
    return {
      user: { firstName: user.firstName, lastName: user.lastName, email },
      token: token,
    };
  }
}

export default AuthMongoController;
