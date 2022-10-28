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
    socket.join(idgrupo);
    chatMessage.addChatGroup(token._id, idgrupo);
  }

  socket.on("entrar-chat-grupo", (grupo) => {
    const grupos = chatMessage.getUsersInGroup(grupo);
    io.to(grupo).emit("chat-grupo-usuarios", grupos);
  });

  socket.on("desconectar-chat-sala", async ({ group, user }) => {
    await chatMessage.disconnectUserInGroup(user.uid, group);
  });
  socket.on("disconnect", () => {
    chatMessage.disconnectUser(token.id);
    io.emit("usuarios-activos", chatMessage.userArr);
  });

  socket.on("mensaje-privado", ({ message, userreceiver: receiver }) => {
    socket
      .to(receiver)
      .emit("mensaje-privado-chat", { from: token.name, message });
  });

  /*
  socket.on("mensaje-privado", ({ message, userreceiver: receiver }) => {
    socket.to(receiver).emit("mensaje-privado", { de: token.name, message });
    socket
      .to(receiver)
      .emit("mensaje-privado-chat", { de: token.name, message });
  });
  */
  socket.on("mensaje-grupo", ({ message, group }) => {
    socket.to(group).emit("mensaje-grupo", { from: token.name, message });
  });
};

module.exports = {
  socketController,
};
