const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SPK,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No JWT");
        } else {
          console.log(token);
          resolve(token);
        }
      }
    );
  });
};

const compareJWT = async (token = "") => {
  try {
    if (token.length < 10) {
      return null;
    }
    console.log(token);
    const { uid } = jwt.verify(token, process.env.SPK);
    const user = await User.findById(uid);
    user.group = null;
    if (user) {
      if (user.status) {
        return user;
      } else {
        return null;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateJWT,
  compareJWT,
};
