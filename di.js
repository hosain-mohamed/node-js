// di is file where we store all dependencies and we can access them from anywhere in the project.

// database
import DBConnection from "./src/DB/db.connect.js";
import MongoDBConnection from "./src/DB/mongo.connect.js";

const dbConnection = new DBConnection(new MongoDBConnection());

export default {
  dbConnection,
};
