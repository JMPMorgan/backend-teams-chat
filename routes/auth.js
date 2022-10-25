const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { inputValidation } = require("../middlewares/validateinput");

const router = new Router();

router.post(
  "/login",
  [check("password", "Password required").notEmpty(), inputValidation],
  login
);

module.exports = router;
