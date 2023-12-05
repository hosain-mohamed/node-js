class ProductRepository {
  constructor(datasource) {
    this.datasource = datasource;
  }

  // get products
  async getProducts(req, res) {
    return await this.datasource.getProducts(req, res);
  }

  // product details
  async getProduct(req, res) {
    return await this.datasource.getProduct(req, res);
  }

  // add product
  async addProduct(req, res) {
    return await this.datasource.addProduct(req, res);
  }

  // update product
  async updateProduct(req, res) {
    return await this.datasource.updateProduct(req, res);
  }

  // delete product
  async deleteProduct(req, res) {
    return await this.datasource.deleteProduct(req, res);
  }
}

export default ProductRepository;
