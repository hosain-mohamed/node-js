import { checkValidId } from "../../../../utils/check.valid.mongo.id.js";
import productModel from "./product.model.js";

class MongoProductController {
  // get products
  async getProducts(req, res) {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = (page - 1) * limit;
    const products = await productModel.find().skip(skip).limit(limit);
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
        { new: true }
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

export default MongoProductController;
