// Category di
import CategoryRepository from "./datasource/category.repository.js";
import MongoCategoryController from "./datasource/mongo/mongo.category.controller.js";
const categoryRepository = new CategoryRepository(
  new MongoCategoryController()
);

export default categoryRepository;
