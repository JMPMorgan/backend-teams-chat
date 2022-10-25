const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");

const login = async (req, res) => {
  try {
    const { password, email, username } = req.body;
    let user;
    if (username) {
      user = await User.findOne({ username });
    } else {
      user = await User.findOne({ email });
    }
    if (!user) {
      return res.status(400).json({
        msg: `Username/E-mail or Password is Incorrect`,
      });
    }
    if (!user.status) {
      return res.status(400).json({
        msg: `User dont exits`,
      });
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: `Username/E-mail or Password is Incorrect`,
      });
    }

    const token = await generateJWT(user.id);
    return res.status(200).json({
      msg: "Login",
      password,
      email,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Server Error`,
    });
  }
};

module.exports = {
  login,
};
