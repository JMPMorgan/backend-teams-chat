const Message = require("../models/message");
const Conversation = require("../models/conversation");
const User = require("../models/user");

const sendMessage = async (req, res) => {
  try {
    const { sendToUser } = req.body;
    const userid = req.id;
    if (sendToUser) {
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
      //msg.;
      await msg.save();
      await msg.populate("sender");
      return res.json({
        msg: "Message Save",
        message: msg,
      });
    }
    const { idgroup, message, idconversation } = req.body;
    let conversation;
    if (!idconversation) {
      conversation = new Conversation({
        group: idgroup,
      });
      await conversation.save();
    } else {
      conversation = await Conversation.findById(idconversation);
      conversation.last_message = Date.now();
      await conversation.save();
    }
    const msg = new Message({
      group: idgroup,
      message: message,
      conversation: conversation._id,
      sender: userid,
    });
    const user = await User.findById(userid);
    await msg.save();
    return res.json({
      msg: "Message Save",
      message: msg,
      from: user.username,
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

const getConversationPerUser = async (req, res) => {
  try {
    const { idconversation } = req.params;
    const data = await Message.find({ conversation: idconversation })
      .limit(30)
      .populate("sender");
    console.log(data);
    const messages = data.map((message) => {
      return {
        _id: message._id,
        from: message.sender.username,
        message: message.message,
      };
    });
    return res.json({
      messages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};
module.exports = {
  sendMessage,
  newConversation,
  getMessagesPerUser,
  getConversationPerUser,
};
