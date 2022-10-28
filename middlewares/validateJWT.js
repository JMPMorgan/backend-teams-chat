const jwt = require("jsonwebtoken");
const User = require("../models/user");
const validateJWT = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      return res.status(401).json({
        msg: "Token dont exits",
      });
    }
    const { uid } = jwt.verify(token, process.env.SPK);
    req.id = uid;
    const userAuth = await User.findById(uid);
    if (!userAuth.status) {
      return res.status(401).json({
        msg: "User Dont Exits",
      });
    }
    req.userAuth = userAuth;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Invalid Token",
    });
  }
};

module.exports = {
  validateJWT,
};
