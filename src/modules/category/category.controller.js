import AppError from "../../utils/app.error.js";
import { CTEGORY_NOT_FOUND } from "../../utils/http.message.text.js";
import * as httpStatus from "../../utils/http.status.text.js";
import categoryRepository from "./category.di.js";
// Category controller

export async function getCategories(req, res) {
  const categories = await categoryRepository.getCategories(req, res);
  res.json({
    status: httpStatus.SUCCESS,
    data: categories,
  });
}

export async function getCategory(req, res) {
  const category = await categoryRepository.getCategory(req, res);
  if (!category) throw new AppError(404, CTEGORY_NOT_FOUND);
  res.json({
    status: httpStatus.SUCCESS,
    data: { category },
  });
}

export async function createCategory(req, res) {
  const newCategory = await categoryRepository.createCategory(req, res);
  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: { category: newCategory },
  });
}

export async function updateCategory(req, res) {
  const updatedCategory = await categoryRepository.updateCategory(req, res);
  if (!updatedCategory) throw new AppError(404, CTEGORY_NOT_FOUND);
  res.json({
    status: httpStatus.SUCCESS,
    data: { category: updatedCategory },
  });
}

export async function deleteCategory(req, res) {
  const deletedCategory = await categoryRepository.deleteCategory(req, res);
  if (!deletedCategory) throw new AppError(404, CTEGORY_NOT_FOUND);
  res.json({
    status: httpStatus.SUCCESS,
    data: null,
  });
}
