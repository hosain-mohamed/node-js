import ProductRepository from "./product.di.js";
import * as httpStatus from "../../utils/http.status.text.js";
import * as httpMessages from "../../utils/http.message.text.js";
import AppError from "../../utils/app.error.js";

// get products
export async function getProducts(req, res) {
  const products = await ProductRepository.getProducts(req, res);
  return res.json({
    status: httpStatus.SUCCESS,
    data: { products },
  });
}

// product details
export async function getProduct(req, res, next) {
  const product = await ProductRepository.getProduct(req, res);
  if (!product) {
    throw new AppError(404, "", httpStatus.FAIL, {
      product: httpMessages.PRODUCT_NOT_FOUND,
    });
  }
  return res.json({
    status: httpStatus.SUCCESS,
    data: { product },
  });
}

// add product
export async function addProduct(req, res) {
  const newProduct = await ProductRepository.addProduct(req, res);
  res
    .status(201)
    .json({ status: httpStatus.SUCCESS, data: { product: newProduct } });
}

// update product
export async function updateProduct(req, res, next) {
  const updatedProduct = await ProductRepository.updateProduct(req, res);
  if (!updatedProduct) {
    throw new AppError(404, "", httpStatus.FAIL, {
      product: httpMessages.PRODUCT_NOT_FOUND,
    });
  }
  res.json({
    status: httpStatus.SUCCESS,
    data: { product: updatedProduct },
  });
}

// delete product
export async function deleteProduct(req, res) {
  const deletedProduct = await ProductRepository.deleteProduct(req, res);
  if (!deletedProduct) {
    throw new AppError(404, "", httpStatus.FAIL, {
      product: httpMessages.PRODUCT_NOT_FOUND,
    });
  }
  res.json({
    status: httpStatus.SUCCESS,
    data: null,
  });
}
