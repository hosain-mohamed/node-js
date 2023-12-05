// User repository

class UserRepository {
  constructor(datasource) {
    this.datasource = datasource;
  }

  // get user
  async getUser(req, res, next) {
    return await this.datasource.getUser(req, res, next);
  }

  // get current user
  async getCurrentUser(req, res, next) {
    return await this.datasource.getCurrentUser(req, res, next);
  }

  // get users
  async getUsers(req, res, next) {
    return await this.datasource.getUsers(req, res, next);
  }

  // delete user
  async deleteUser(req, res, next) {
    return await this.datasource.deleteUser(req, res, next);
  }

  // edit user
  async editUser(req, res, next) {
    return await this.datasource.editUser(req, res, next);
  }
}

export default UserRepository;
