// Auth di

import AuthRepository from "./datasource/auth.repository.js";
import AuthMongoController from "./datasource/mongo/mongo.auth.controller.js";

const authRepository = new AuthRepository(new AuthMongoController());

export default authRepository;
