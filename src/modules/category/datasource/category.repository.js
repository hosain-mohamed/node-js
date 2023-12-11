// Category repository

class CategoryRepository {
  constructor(datasource) {
    this.datasource = datasource;
  }
  async getCategories(req, res) {
    return await this.datasource.getCategories(req, res);
  }
  async getCategory(req, res) {
    return await this.datasource.getCategory(req, res);
  }
  async createCategory(req, res) {
    return await this.datasource.createCategory(req, res);
  }
  async updateCategory(req, res) {
    return await this.datasource.updateCategory(req, res);
  }
  async deleteCategory(req, res) {
    return await this.datasource.deleteCategory(req, res);
  }
}

export default CategoryRepository;
