import mongoose from "mongoose";

class MongoDBConnection {
  connect() {
    try {
      const connectionString = process.env.MONGO_CONNECTION_STRING;

      mongoose.connect(connectionString).then(() => {
        console.log("DB Connected");
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default MongoDBConnection;
