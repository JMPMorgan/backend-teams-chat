const { Schema, model } = require("mongoose");

const MessageSchema = Schema({
  situation: {
    type: Number,
    required: true,
    default: 0,
  },
  creation_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  message: {
    type: String,
    required: [true, "Message Cant be empty"],
  },
});

module.exports = model("Message", MessageSchema);
