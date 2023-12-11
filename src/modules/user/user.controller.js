// User controller
import AppError from "../../utils/app.error.js";
import { USERNOTFOUND } from "../../utils/http.message.text.js";
import { SUCCESS } from "../../utils/http.status.text.js";
import userRepository from "./user.di.js";

// getUser
export async function getUser(req, res, next) {
  const user = await userRepository.getUser(req, res, next);
  if (!user) throw new AppError(404, USERNOTFOUND);
  res.status(200).json({
    status: SUCCESS,
    data: { user },
  });
}

// getCurrentUser
export async function getCurrentUser(req, res, next) {
  const user = await userRepository.getCurrentUser(req, res, next);
  if (!user) throw new AppError(404, USERNOTFOUND);
  res.status(200).json({
    status: SUCCESS,
    data: { user },
  });
}

// getUsers
export async function getUsers(req, res, next) {
  const users = await userRepository.getUsers(req, res, next);
  res.status(200).json({
    status: SUCCESS,
    data: users,
  });
}
// delete user
export async function deleteUser(req, res, next) {
  const user = await userRepository.deleteUser(req, res, next);
  if (!user) throw new AppError(404, USERNOTFOUND);
  res.status(200).json({
    status: SUCCESS,
    data: null,
  });
}

// edit User
export async function editUser(req, res, next) {
  const user = await userRepository.editUser(req, res, next);
  if (!user) throw new AppError(404, USERNOTFOUND);
  res.status(200).json({
    status: SUCCESS,
    data: { user },
  });
}
