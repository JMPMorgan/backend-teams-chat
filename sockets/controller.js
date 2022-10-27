const { validateJWT } = require("../middlewares/validateJWT");

const socketController = async (socket, io) => {
  const idgrupo = socket.handshake.headers.group;
  const token = await validateJWT(socket.handshake.headers["token"]);
  if (!token) {
    return socket.disconnect();
  }
  //TODO:Implenatar el modelo de los usuarios y chat
  //io.emit("usuarios-activos",)
  //socket.emit("recibir-mensajes")

  socket.join(token.id);

  if (idgrupo) {
    socket.join(idgrupo);
  }

  socket.on("entrar-chat-grupo", (grupo) => {
    //TODO: Modelo chat mensajes
    //const grupos=
    io.to(grupo).emit("chat-grupo-usuarios", grupos);
  });
};

module.exports = {
  socketController,
};
