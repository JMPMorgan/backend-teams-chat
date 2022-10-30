const { compareJWT } = require("../helpers/generateJWT");
const ChatMessage = require("../models/chat-messages");

const chatMessage = new ChatMessage();
const socketController = async (socket, io) => {
  const idgrupo = socket.handshake.headers.group;
  const token = await compareJWT(socket.handshake.headers["token"]);
  if (!token) {
    return socket.disconnect();
  }
  chatMessage.addUser(token);
  io.emit("usuarios-activos", chatMessage.userArr);
  socket.emit("recibir-mensajes", chatMessage.last10);

  socket.join(token.id);

  if (idgrupo) {
    chatMessage.addChatGroup(token._id, idgrupo);
    socket.join(idgrupo);
  }

  socket.on("entrar-chat-grupo", (grupo) => {
    const grupos = chatMessage.getUsersInGroup(grupo);
    io.to(grupo).emit("chat-grupo-usuarios", grupos);
  });

  socket.on("desconectar-chat-sala", async ({ group }) => {
    await chatMessage.disconnectUserInGroup(token.id, group);
  });
  socket.on("desconectar-chat", () => {
    return socket.disconnect();
  });
  socket.on("disconnect", () => {
    chatMessage.disconnectUser(token.id);
    io.emit("usuarios-activos", chatMessage.userArr);
  });

  socket.on("mensaje-privado", ({ message, userreceiver: receiver }) => {
    socket.to(receiver).emit("mensaje-privado-chat", {
      from: token.username,
      message,
      _id: token._id,
    });
  });

  /*
  socket.on("mensaje-privado", ({ message, userreceiver: receiver }) => {
    socket.to(receiver).emit("mensaje-privado", { de: token.name, message });
    socket
      .to(receiver)
      .emit("mensaje-privado-chat", { de: token.name, message });
  });
  */
  socket.on("mensaje-grupo", ({ message, idgroup }) => {
    console.log(message, idgroup);
    socket.to(idgroup).emit("mensaje-grupo-recibido", {
      from: token.username,
      message,
      _id: token._id,
    });
  });
};

module.exports = {
  socketController,
};
