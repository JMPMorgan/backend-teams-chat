const { Schema, model } = require("mongoose");

const ConversationSchema = Schema({
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  creation_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  user: {
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
  last_message: {
    type: Date,
    required: false,
    default: Date.now(),
  },
});

module.exports = model("Conversation", ConversationSchema);
