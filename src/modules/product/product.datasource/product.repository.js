// import the correct datasource
import * as datasource from "./file.product.source.js";

// get products
export function getProducts(req, res) {
  return datasource.getProducts(req, res);
}

// product details
export function getProduct(req, res) {
  return datasource.getProduct(req, res);
}

// add product
export function addProduct(req, res) {
  return datasource.addProduct(req, res);
}

// update product
export function updateProduct(req, res) {
  return datasource.updateProduct(req, res);
}

// delete product
export function deleteProduct(req, res) {
  return datasource.deleteProduct(req, res);
}
