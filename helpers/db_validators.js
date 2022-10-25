const User = require("../models/user");

const exitsUserPerID = async (id) => {
  const hasUser = await User.findById(id);
  if (!hasUser) {
    throw new Error(`ID not Exits ${id}`);
  }
};

const rolValidator = async (req, res) => {};

const idExists = async (id = "") => {
  const exits = await User.findById(id);
  if (!exits) {
    throw new Error("ID not exits");
  }
};

const emailExist = async (mail = "") => {
  const exits = await User.findOne({ mail });
  if (exits) {
    throw new Error(`${mail} is already registered`);
  }
};

const userExist = async (username = "") => {
  const exits = await User.findOne({ username });
  if (exits) {
    throw new Error(`${username} is already registered`);
  }
};

module.exports = {
  exitsUserPerID,
  idExists,
  emailExist,
  userExist,
};
