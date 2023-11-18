class DBConnection {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async connect() {
    this.dbConnection.connect();
  }
}

export default DBConnection;
