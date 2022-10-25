const Group = require("../models/group");

const getGroup = async (req, res) => {
  try {
    const { id } = req.params;
    //const group= await
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

const postGroup = async (req, res) => {
  try {
    const { name } = req.params;
    const exitsGroup = await Group.findOne({ name });
    if (exitsGroup) {
      return res.status(400).json({
        msg: `Group ${name} is already exits`,
      });
    }

    const group = new Group(name);
    await group.save();
    res.json({
      msg: "Group Created",
      group,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

const deleteGroup = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

const updateGroup = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

const getGroups = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

module.exports = {
  getGroup,
  getGroups,
  postGroup,
  deleteGroup,
  updateGroup,
};
