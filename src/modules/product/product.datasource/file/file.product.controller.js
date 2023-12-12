import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const productsPath = `${__dirname}/products.json`;

async function getProductsFromFile() {
  if (!fs.existsSync(productsPath)) {
    return [];
  }
  const content = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  return content;
}

async function _getProduct(id) {
  const products = await getProductsFromFile();
  const product = products.find((productParam) => productParam.id === id);
  return product;
}

class FileProductController {
  // get products
  async getProducts(req, res) {
    const products = await getProductsFromFile();
    return products;
  }

  // product details
  async getProduct(req, res) {
    const id = +req.params.id;
    const products = await getProductsFromFile();
    const product = products.find((productParam) => productParam.id === id);
    return product;
  }

  // add product
  async addProduct(req, res) {
    let products = await getProductsFromFile();

    if (!fs.existsSync(productsPath)) {
      fs.writeFileSync(productsPath, JSON.stringify([]));
      products = [];
    }
    // set id to the max id in the products + 1
    const maxId = products.reduce((maxIdParam, product) => {
      if (product.id > maxIdParam) maxIdParam = product.id;
      return maxId;
    }, 0);

    const newProduct = { id: maxId + 1, ...req.body };
    products.push(newProduct);
    fs.writeFileSync(productsPath, JSON.stringify(products));
    return newProduct;
  }

  // update product
  async updateProduct(req, res) {
    const products = await getProductsFromFile();
    const id = +req.params.id;
    const product = await _getProduct(id);
    if (!product) return;
    const index = products.findIndex((productParam) => productParam.id === id);
    products[index] = { ...product, ...req.body };

    fs.writeFileSync(productsPath, JSON.stringify(products));
    return products[index];
  }

  // delete product
  async deleteProduct(req, res) {
    const products = await getProductsFromFile();
    const id = +req.params.id;
    const product = await _getProduct(id);
    if (!product) return;
    const index = products.findIndex((productParam) => productParam.id === id);
    products.splice(index, 1);
    fs.writeFileSync(productsPath, JSON.stringify(products));
    return product;
  }
}

export default FileProductController;
