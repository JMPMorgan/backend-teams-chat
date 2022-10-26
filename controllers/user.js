const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const getUser = async (req, res) => {
  try {
    console.log(req.id);
    const id = req.id;
    console.log(id);
    const user = await User.findById(id);
    res.json({
      msg: "Get User",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const query = { status: true };
    const users = await User.find(query);
    res.json({
      msg: "Get Users",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

const getUserFinder = async (req, res) => {
  try {
    const { data } = req.params;
    const users = await User.find({
      $or: [
        {
          name: {
            $regex: data,
            $options: "i",
          },
          _id: {
            $ne: req.id,
          },
        },
        {
          username: {
            $regex: data,
            $options: "i",
          },
          _id: {
            $ne: req.id,
          },
        },
      ],
    }).limit(5);
    return res.json({
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};
const postUser = async (req, res) => {
  try {
    const { name, email, password, lastname, username, cpassword } = req.body;
    const exitsEmail = await User.findOne({ email });
    console.log(exitsEmail);
    if (exitsEmail) {
      return res.status(400).json({
        msg: `Email: ${email} already exits`,
      });
    }
    const exitsUsername = await User.findOne({ username });
    if (exitsUsername) {
      return res.status(400).json({
        msg: `Username: ${username} already exits`,
      });
    }

    const user = new User({
      name,
      email,
      password,
      username,
      lastname,
    });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();

    res.json({
      msg: "Post User",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const user = await User.findById(id);
    user.name = name;
    await user.save();
    res.json({
      msg: "Update User",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    console.log("Hola");
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { status: false });
    console.log("Aqui");
    res.json({
      msg: "Delete User",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

module.exports = {
  getUser,
  getUsers,
  getUserFinder,
  updateUser,
  postUser,
  deleteUser,
};
