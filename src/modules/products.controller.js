import * as ProductModel from "./models/file.product.model.js";

// get products
export function getProducts(req, res) {
  return ProductModel.getProducts(req, res);
}

// product details
export function getProductDetails(req, res) {
  return ProductModel.getProduct(req, res);
}

// add product
export function addProduct(req, res) {
  return ProductModel.addProduct(req, res);
}

// update product
export function updateProduct(req, res) {
  return ProductModel.updateProduct(req, res);
}

// delete product
export function deleteProduct(req, res) {
  return ProductModel.deleteProduct(req, res);
}
