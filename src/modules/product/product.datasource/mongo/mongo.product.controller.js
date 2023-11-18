import productModel from "./product.model.js";
import mongoose from "mongoose";

class MongoProductController {
  // get products
  async getProducts(req, res) {
    const products = await productModel.find();
    return products;
  }

  // product details
  async getProduct(req, res) {
    const id = req.params.id;
    return checkValidId(id, async () => {
      const product = await productModel.findById(id);
      return product;
    });
  }

  // add product
  async addProduct(req, res) {
    const newProduct = await productModel.create(req.body);
    return newProduct;
  }

  // edit product
  async updateProduct(req, res) {
    const id = req.params.id;
    return checkValidId(id, async () => {
      const updatedProduct = await productModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      return updatedProduct;
    });
  }

  // delete product
  async deleteProduct(req, res) {
    const id = req.params.id;
    return checkValidId(id, async () => {
      const deletedProduct = await productModel.findByIdAndDelete(id);
      return deletedProduct;
    });
  }
}

// check if product exists
async function checkValidId(id, callBack) {
  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) return;
  return callBack();
}

export default MongoProductController;
