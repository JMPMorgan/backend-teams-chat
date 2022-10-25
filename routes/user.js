const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUser,
  getUsers,
  postUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const {
  exitsUserPerID,
  emailExist,
  userExist,
} = require("../helpers/db_validators");
const { inputValidation } = require("../middlewares/validateinput");
const { validateJWT } = require("../middlewares/validateJWT");

const router = new Router();

router.get("/", getUsers);
router.get("/token", [validateJWT, inputValidation], getUser);
router.post(
  "/",
  [
    check("email", "Incorrect format in email").isEmail(),
    check("email").custom(emailExist),
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "lastname is required").not().isEmpty(),
    check("username", "Username is required").not().isEmpty(),
    check("username").custom(userExist),
    check(
      "password",
      "Password is required and the characters must be more than 6"
    ).isLength({ min: 6 }),
    inputValidation,
  ],
  postUser
);
router.put(
  "/:id",
  [
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(exitsUserPerID),
    inputValidation,
  ],
  updateUser
);
router.delete(
  "/:id",
  [
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(exitsUserPerID),
    inputValidation,
  ],
  deleteUser
);

module.exports = router;
