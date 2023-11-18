import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const productsPath = __dirname + "/products.json";

// get products
export function getProducts(req, res) {
  const products = _getProducts();
  if (!products.length)
    return res.json({ message: "No Products Found", products: products });
  res.json({ products: products });
}

// product details
export function getProduct(req, res) {
  const id = +req.params.id;
  const product = _checkProductExistence(id, res);
  res.json({ product: product });
}

// add product
export function addProduct(req, res) {
  let products = _getProducts();
  // set id to the max id in the products + 1
  if (!fs.existsSync(productsPath)) {
    fs.writeFileSync(productsPath, JSON.stringify([]));
    products = [];
  }
  const maxId = products.reduce((maxId, product) => {
    if (product.id > maxId) maxId = product.id;
    return maxId;
  }, 0);

  const newProduct = { id: maxId + 1, ...req.body };
  products.push(newProduct);
  fs.writeFileSync(productsPath, JSON.stringify(products));
  res
    .status(201)
    .json({ message: "Product Added Successfully", product: newProduct });
}

// update product
export function updateProduct(req, res) {
  const products = _getProducts();
  const id = +req.params.id;
  _checkProductExistence(id, res);
  const updatedProduct = { id, ...req.body };
  const index = products.findIndex((product) => product.id === id);
  products[index] = updatedProduct;
  fs.writeFileSync(productsPath, JSON.stringify(products));
  res.json({
    message: "Product Updated Successfully",
    product: updatedProduct,
  });
}

// delete product
export function deleteProduct(req, res) {
  const products = _getProducts();
  const id = +req.params.id;
  _checkProductExistence(id, res);
  const index = products.findIndex((product) => product.id === id);
  products.splice(index, 1);
  fs.writeFileSync(productsPath, JSON.stringify(products));
  res.json({
    message: "Product Deleted Successfully",
  });
}

function _checkProductExistence(id, res) {
  const products = _getProducts();
  const product = products.find((product) => product.id === id);
  if (!product)
    return res
      .status(404)
      .json({ message: "No Product Found", product: product });
  return product;
}

function _getProducts() {
  if (!fs.existsSync(productsPath)) {
    return [];
  } else {
    const content = JSON.parse(fs.readFileSync(productsPath, "utf8"));
    return content;
  }
}
