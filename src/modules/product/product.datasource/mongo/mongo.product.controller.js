import slugify from "slugify";
import getPaginatedItems from "../../../../utils/get.paginated.items.js";
import productModel from "./product.model.js";

class MongoProductController {
  // get products
  async getProducts(req, res) {
    const products = await getPaginatedItems(productModel, req, "products");
    return products;
  }

  // product details
  async getProduct(req, res) {
    const { id } = req.params;
    const product = await productModel.findById(id);
    return product;
  }

  // add product
  async addProduct(req, res) {
    if (req.body.name) req.body.slug = slugify(req.body.name, { lower: true });
    if (req.file) req.body.image = req.file.path;
    const newProduct = await productModel.create(req.body);
    return newProduct;
  }

  // edit product
  async updateProduct(req, res) {
    const { id } = req.params;
    if (req.body.name) req.body.slug = slugify(req.body.name, { lower: true });
    const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return updatedProduct;
  }

  // delete product
  async deleteProduct(req, res) {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);
    return deletedProduct;
  }
}

export default MongoProductController;
