const groupCtrl = {};
const GroupModel = require("../models/groups");

//Funcion para crear grupo
groupCtrl.createGroup = async (req, res) => {
  const { groupInfo } = req.body;

  const newGroup = new GroupModel({
    groupName: groupInfo.groupName,
    members: groupInfo.members,
  });

  const group = await newGroup.save();
  res.json(group);
};

//Funcion para listar grupos
groupCtrl.getGroups = async (req, res) => {
  const groups = await GroupModel.find();
  res.json(groups);
};
module.exports = groupCtrl;
