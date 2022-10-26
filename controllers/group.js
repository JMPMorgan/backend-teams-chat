const Group = require("../models/group");
const GroupUser = require("../models/group-user");
const Message = require("../models/message");

const getGroup = async (req, res) => {
  try {
    const userid = req.id;
    const { loadMessages } = req.query;
    const { id } = req.params;
    if (loadMessages === "true") {
      const messages = await Message.find({ group: id }).populate(
        "conversation"
      );
      const group = await Group.findById(id);
      return res.json({
        messages,
        group,
      });
    }
    const group = await Group.findById(id);
    return res.json({
      group,
    });
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
    const { name } = req.body;
    const exitsGroup = await Group.findOne({ name });
    if (exitsGroup) {
      return res.status(400).json({
        msg: `Group ${name} is already exits`,
      });
    }
    const userid = req.id;
    console.log(name);
    const group = new Group({ name: name, user_owner: userid });
    const groupuser = new GroupUser({ group: group._id, user: userid });
    await groupuser.save();
    await group.save();
    return res.json({
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
    const id = req.id;
    console.log(id);
    const groups = await GroupUser.find({ user: id }).populate("group");
    return res.json({
      groups,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

const addUserToGroup = async (req, res) => {
  try {
    const { iduser, idgroup } = req.body;
    const groupuser = new GroupUser({ user: iduser, group: idgroup });
    await groupuser.save();
    return res.json({
      msg: "User added to conversation",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

module.exports = {
  addUserToGroup,
  deleteGroup,
  getGroup,
  getGroups,
  postGroup,
  updateGroup,
};
