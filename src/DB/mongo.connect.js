import mongoose from "mongoose";

class MongoDBConnection {
  connect() {
    try {
      const connectionString =
        "mongodb+srv://hosainabdellatif:amnotpro@cluster0.rmwcohu.mongodb.net/commerce";

      mongoose.connect(connectionString).then(() => {
        console.log("DB Connected");
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default MongoDBConnection;
