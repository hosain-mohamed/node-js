import mongoose from "mongoose";

class MongoDBConnection {
  connect() {
    try {
      const connectionString = "";

      mongoose.connect(connectionString).then(() => {
        console.log("DB Connected");
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default MongoDBConnection;
