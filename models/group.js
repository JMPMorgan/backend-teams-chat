const { Schema, model } = require("mongoose");
const GroupSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  user_owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creation_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = model("Group", GroupSchema);
