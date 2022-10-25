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
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  last_message: {
    type: Date,
    required: false,
  },
});

module.exports = model("Conversation", ConversationSchema);
