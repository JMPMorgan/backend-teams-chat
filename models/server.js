const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.USER_PATH = "/api/user";
    this.AUTH_PATH = "/api/auth";
    this.GROUP_PATH = "/api/group";
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    //this.app.use()
    this.app.use(this.USER_PATH, require("../routes/user"));
    this.app.use(this.AUTH_PATH, require("../routes/auth"));
    this.app.use(this.GROUP_PATH, require("../routes/group"));
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server Running in PORT:${this.port}`);
    });
  }
}

module.exports = Server;
