// Auth repository

class AuthRepository {
  constructor(dc) {
    this.dc = dc;
  }

  async register(req, res, next) {
    return await this.dc.register(req, res, next);
  }

  async login(req, res, next) {
    return await this.dc.login(req, res, next);
  }
}

export default AuthRepository;
