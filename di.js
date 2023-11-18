// di is file where we store all dependencies and we can access them from anywhere in the project.

// database
import DBConnection from "./src/DB/db.connect.js";
import MongoDBConnection from "./src/DB/mongo.connect.js";
const dbConnection = new DBConnection(new MongoDBConnection());

// product repository
import ProductRepository from "./src/modules/product/product.datasource/product.repository.js";
import FileProductController from "./src/modules/product/product.datasource/file/file.product.controller.js";
import MongoProductController from "./src/modules/product/product.datasource/mongo/mongo.product.controller.js";
const productRepository = new ProductRepository(new MongoProductController());

export default {
  dbConnection,
  productRepository,
};
