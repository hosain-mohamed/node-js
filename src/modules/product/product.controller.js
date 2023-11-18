import * as ProductRepository from "./product.datasource/product.repository.js";

// get products
export function getProducts(req, res) {
  return ProductRepository.getProducts(req, res);
}

// product details
export function getProduct(req, res) {
  return ProductRepository.getProduct(req, res);
}

// add product
export function addProduct(req, res) {
  return ProductRepository.addProduct(req, res);
}

// update product
export function updateProduct(req, res) {
  return ProductRepository.updateProduct(req, res);
}

// delete product
export function deleteProduct(req, res) {
  return ProductRepository.deleteProduct(req, res);
}
