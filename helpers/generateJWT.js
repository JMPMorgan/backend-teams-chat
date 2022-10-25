const jwt = require("jsonwebtoken");

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

module.exports = {
  generateJWT,
};
