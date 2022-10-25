const { Schema, model } = require("mongoose");
const GroupSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = model("Group", GroupSchema);
