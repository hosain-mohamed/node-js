// Auth controller

import authRepoistory from "./auth.di.js";
import * as httpStatus from "../../utils/http.status.text.js";

export async function register(req, res, next) {
  const result = await authRepoistory.register(req, res, next);
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: result,
  });
}

export async function login(req, res, next) {
  const result = await authRepoistory.login(req, res, next);
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: result,
  });
}
