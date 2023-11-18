// product repository
import ProductRepository from "./product.datasource/product.repository.js";
import FileProductController from "./product.datasource/file/file.product.controller.js";
import MongoProductController from "./product.datasource/mongo/mongo.product.controller.js";
const productRepository = new ProductRepository(new MongoProductController());

export default productRepository;
