const Message = require("../models/message");
const Conversation = require("../models/conversation");
const User = require("../models/user");

const sendMessage = async (req, res) => {
  try {
    const { sendToUser } = req.body;
    if (sendToUser) {
      const userid = req.id;
      const { userreceiver, message, idconversation } = req.body;
      let conversation;
      if (!idconversation) {
        conversation = new Conversation({
          user: userid,
          receiver: userreceiver,
        });
        await conversation.save();
      } else {
        conversation = await Conversation.findById(idconversation);
        conversation.last_message = Date.now();
        await conversation.save();
      }
      const msg = new Message({
        sender: userid,
        receiver: userreceiver,
        message: message,
        conversation: conversation._id,
      });
      await msg.save();

      return res.json({
        msg: "Message Save",
      });
    }
    console.log("Aqui esta arreabatao", req.body);
    console.log(sendToUser);
    const { idgroup, message, idconversation } = req.body;
    let conversation;
    if (!idconversation) {
      console.log("Hola");
      conversation = new Conversation({
        group: idgroup,
      });
      await conversation.save();
      console.log(conversation);
    } else {
      conversation = await Conversation.findById(idconversation);
      conversation.last_message = Date.now();
      await conversation.save();
    }
    const msg = new Message({
      group: idgroup,
      message: message,
      conversation: conversation._id,
    });
    await msg.save();
    return res.json({
      msg: "Message Save",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

const newConversation = async (req, res) => {
  const iduser = req.id;
  const { idreceiver } = req.body;
  const exitstConversation = await Conversation.findOne({
    $or: [
      {
        user: iduser,
        receiver: idreceiver,
      },
      {
        receiver: iduser,
        user: idreceiver,
      },
    ],
  });
  if (exitstConversation) {
    return res.json({
      exitstConversation: true,
      msg: "Exits a Conversation with this user",
    });
  }
  const conversation = new Conversation({ user: iduser, receiver: idreceiver });
  await conversation.save();
  const userdata = await User.findById(iduser);
  const message = new Message({
    sender: iduser,
    receiver: idreceiver,
    conversation: conversation._id,
    message: `El Usuario: ${userdata.name} ha iniciado la conversacion`,
  });
  await message.save();
  return res.json({
    exitstConversation: false,
    msg: "Conversation Created",
  });
};

const getMessagesPerUser = async (req, res) => {
  //const { idreceiver } = req.params;
  const iduser = req.id;
  const conversation = await Conversation.find({
    $or: [
      {
        user: iduser,
      },
      {
        receiver: iduser,
      },
    ],
  })
    .populate("user")
    .populate("receiver")
    .limit(10)
    .sort({ creation_date: -1 });
  const conversations = conversation.map((info) => {
    const { user, receiver, _id } = info;
    if (user._id.toString() === iduser) {
      return { user, receiver, _id, idreceiver: receiver._id };
    }
    return { user, receiver, _id, idreceiver: user._id };
  });
  for (let index = 0; index < conversations.length; index++) {
    const message = await Message.findOne({
      conversation: conversations[index]._id,
      situation: 0,
    }).sort({ creation_date: -1 });
    conversations[index].message = message;
  }
  return res.json({
    conversations,
  });
};

const setMessages = (conversations) => {
  new Promise((resolve, reject) => {
    console.log("Hola", conversations);
  });
};

module.exports = {
  sendMessage,
  newConversation,
  getMessagesPerUser,
};
