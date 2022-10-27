const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { dbConnection } = require("../database/config");
const { socketController } = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
    this.io - require("socket.io")(this.server);
    this.USER_PATH = "/api/user";
    this.AUTH_PATH = "/api/auth";
    this.GROUP_PATH = "/api/group";
    this.MESSAGE_PATH = "/api/message";
    this.connectDB();
    this.middlewares();
    this.routes();
    this.sockets();
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
    this.app.use(this.MESSAGE_PATH, require("../routes/message"));
  }

  sockets() {
    this.io.on("connection", (socket) => socketController(socket, this.io));
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server Running in PORT:${this.port}`);
    });
  }
}

module.exports = Server;
