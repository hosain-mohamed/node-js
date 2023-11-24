import ProductRepository from "./product.di.js";
import * as httpStatus from "../../utils/http_status_text.js";
import * as httpMessages from "../../utils/http_message_text.js";

// get products
export async function getProducts(req, res) {
  const products = await ProductRepository.getProducts(req, res);
  return res.json({
    status: httpStatus.SUCCESS,
    data: { products },
  });
}

// product details
export async function getProduct(req, res) {
  const product = await ProductRepository.getProduct(req, res);
  if (!product) {
    return res.status(404).json({
      status: httpStatus.FAIL,
      data: { product: httpMessages.PRODUCT_NOT_FOUND },
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
export async function updateProduct(req, res) {
  const updatedProduct = await ProductRepository.updateProduct(req, res);
  if (!updatedProduct) {
    return res.status(404).json({
      status: httpStatus.FAIL,
      data: { product: httpMessages.PRODUCT_NOT_FOUND },
    });
  }
  res.json({
    status: httpStatus.SUCCESS,
    data: {
      product: updatedProduct,
    },
  });
}

// delete product
export async function deleteProduct(req, res) {
  const deletedProduct = await ProductRepository.deleteProduct(req, res);
  if (!deletedProduct) {
    return res.status(404).json({
      status: httpStatus.FAIL,
      data: { product: httpMessages.PRODUCT_NOT_FOUND },
    });
  } else
    res.status(204).json({
      status: httpStatus.SUCCESS,
      data: null,
    });
}
