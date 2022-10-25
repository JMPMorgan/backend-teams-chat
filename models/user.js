const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  lastname: {
    type: String,
    required: [true, "Lastname is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
  },
  password: {
    type: String,
    required: [
      true,
      "Password is required ,must be 8 Characters and include a character number and special character",
    ],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER",
    enum: ["ADMIN", "ARTIST", "USER"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
});

UserSchema.methods.toJson = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", UserSchema);
