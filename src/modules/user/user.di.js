// User di

import UserRepository from "./datasource/user.repository.js";
import MongoUserController from "./datasource/mongo/mongo.user.controller.js";

const userRepository = new UserRepository(new MongoUserController());

export default userRepository;
