// Category category
import slugify from "slugify";
import { getPaginatedItems } from "../../../../utils/get.paginated.items.js";
import CategoryModel from "./category.model.js";

class MongoCategoryController {
  async getCategories(req, res) {
    const categories = await getPaginatedItems(
      CategoryModel,
      req,
      "categories"
    );
    return categories;
  }

  async getCategory(req, res) {
    const category = await CategoryModel.findById(req.params.id);
    return category;
  }

  async createCategory(req, res) {
    const slug = slugify(req.body.name, { lower: true });
    const image = req.file ? req.file.path : null;
    if (image) req.body.image = image;
    const newCategory = await CategoryModel.create({ ...req.body, slug });
    return newCategory;
  }

  async updateCategory(req, res) {
    const id = req.params.id;
    if (req.body.name) req.body.slug = slugify(req.body.name, { lower: true });
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    return updatedCategory;
  }

  async deleteCategory(req, res) {
    const id = req.params.id;
    const deletedCategory = await CategoryModel.findByIdAndDelete(id);
    return deletedCategory;
  }
}

export default MongoCategoryController;
