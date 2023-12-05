// Auth mongo controller
import bcrypt from "bcrypt";
import * as httpMessages from "../../../../utils/http.message.text.js";
import { generateToken } from "../../../../utils/generate_token.js";
import AppError from "../../../../utils/app.error.js";
import * as httpStatus from "../../../../utils/http.status.text.js";
import userModel from "../../../user/datasource/mongo/user.model.js";

class AuthMongoController {
  async register(req, res, next) {
    const data = req.body;
    // set avatar
    const avatar = req.file ? req.file.path : null;
    if (avatar) {
      data.avatar = `${process.env.BASE_URL}/${avatar}`;
    }

    // create hashed password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // if user already exists
    const existUser = await userModel.findOne({ email: data.email });
    if (existUser) {
      throw new AppError(409, "", httpStatus.FAIL, {
        user: httpMessages.USER_ALREADY_EXISTS,
      });
    }

    // create user
    const user = await userModel.create({ ...data, password: hashedPassword });

    // generate token & return user without password & token
    const token = await generateToken(user);
    user.password = undefined;
    user.__v = undefined;
    return {
      user,
      token,
    };
  }

  async login(req, res, next) {
    const data = req.body;
    // check if user exists
    const user = await userModel
      .findOne({ email: data.email })
      .select("+password");

    if (!user) {
      throw new AppError(404, "", httpStatus.FAIL, {
        user: httpMessages.USER_NOT_FOUND,
      });
    }

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new AppError(401, "", httpStatus.FAIL, {
        user: httpMessages.INVALID_CREDENTIALS,
      });
    }

    // generate token
    const token = await generateToken(user);

    // return user without password & token
    user.password = undefined;
    return {
      user,
      token,
    };
  }
}

export default AuthMongoController;
