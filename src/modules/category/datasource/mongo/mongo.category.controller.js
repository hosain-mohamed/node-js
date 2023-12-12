// Category category
import slugify from "slugify";
import getPaginatedItems from "../../../../utils/get.paginated.items.js";
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
    if (req.body.name) req.body.slug = slugify(req.body.name, { lower: true });
    if (req.file) req.body.image = req.file.path;
    const newCategory = await CategoryModel.create(req.body);
    return newCategory;
  }

  async updateCategory(req, res) {
    const { id } = req.params;
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
    const { id } = req.params;
    const deletedCategory = await CategoryModel.findByIdAndDelete(id);
    return deletedCategory;
  }
}

export default MongoCategoryController;
