const { Router } = require("express");
const { check } = require("express-validator");
const {
  deleteGroup,
  getGroup,
  getGroups,
  postGroup,
  updateGroup,
} = require("../controllers/group");

const router = new Router();

router.get("/", getGroups);

router.get("/:id", getGroup);

router.post("/", postGroup);

router.delete("/:id", deleteGroup);

router.put("/:id", updateGroup);

module.exports = router;
