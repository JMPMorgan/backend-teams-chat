const { Schema, model } = require("mongoose");

const GroupUserSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
});

module.exports = model("GroupUser", GroupUserSchema);
