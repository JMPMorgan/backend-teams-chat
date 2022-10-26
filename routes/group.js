const { Router } = require("express");
const { check } = require("express-validator");
const {
  deleteGroup,
  getGroup,
  getGroups,
  postGroup,
  updateGroup,
} = require("../controllers/group");
const { inputValidation } = require("../middlewares/validateinput");
const { validateJWT } = require("../middlewares/validateJWT");

const router = new Router();

router.get("/", [validateJWT, inputValidation], getGroups);

router.get("/:id", getGroup);

router.post("/", [validateJWT, inputValidation], postGroup);

router.delete("/:id", deleteGroup);

router.put("/:id", updateGroup);

module.exports = router;
