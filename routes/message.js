const { Router } = require("express");
const { check } = require("express-validator");
const {
  sendMessage,
  newConversation,
  getMessagesPerUser,
} = require("../controllers/message");
const { inputValidation } = require("../middlewares/validateinput");
const { validateJWT } = require("../middlewares/validateJWT");

const router = new Router();

router.get("/", [validateJWT, inputValidation], getMessagesPerUser);

router.post("/", [validateJWT, inputValidation], sendMessage);

router.post(
  "/newconversation",
  [validateJWT, inputValidation],
  newConversation
);

module.exports = router;
