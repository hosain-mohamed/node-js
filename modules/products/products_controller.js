import * as productModel from "./product_model.js";

// get products
export function getProducts(req, res) {
  const products = productModel.getProducts();
  if (!products.length)
    return res.json({ message: "No Products Found", products: products });
  res.json({ products: products });
}

// product details
export function getProductDetails(req, res) {
  const products = productModel.getProducts();
  const id = +req.params.id;
  const product = _checkProductExistence(id, res);
  res.json({ product: product });
}

// add product
export function addProduct(req, res) {
  const products = productModel.getProducts();
  // set id to the max id in the products + 1
  const maxId = products.reduce((maxId, product) => {
    if (product.id > maxId) maxId = product.id;
    return maxId;
  }, 0);

  const newProduct = { id: maxId + 1, ...req.body };
  products.push(newProduct);
  productModel.writeProducts(
    products,
    () => {
      res.status(400).json({ message: "Error Occurred" });
    },
    () => {
      res
        .status(201)
        .json({ message: "Product Added Successfully", product: newProduct });
    }
  );
}

// update product
export function updateProduct(req, res) {
  const products = productModel.getProducts();
  const id = +req.params.id;
  _checkProductExistence(id, res);
  const updatedProduct = { id, ...req.body };
  const index = products.findIndex((product) => product.id === id);
  products[index] = updatedProduct;
  productModel.writeProducts(
    products,
    () => {
      res.status(400).json({ message: "Error Occurred" });
    },
    () => {
      res.json({
        message: "Product Updated Successfully",
        product: updatedProduct,
      });
    }
  );
}

// delete product
export function deleteProduct(req, res) {
  const products = productModel.getProducts();
  const id = +req.params.id;
  _checkProductExistence(id, res);
  const index = products.findIndex((product) => product.id === id);
  products.splice(index, 1);
  productModel.writeProducts(
    products,
    () => {
      res.status(400).json({ message: "Error Occurred" });
    },
    () => {
      res.json({ message: "Product Deleted Successfully" });
    }
  );
}

function _checkProductExistence(id, res) {
  const products = productModel.getProducts();
  const product = products.find((product) => product.id === id);
  if (!product)
    return res
      .status(404)
      .json({ message: "No Product Found", product: product });
  return product;
}
