const Class = require("../database/model/class");
const User = require("../database/model/users");
const Project = require("../database/model/project");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const request = require("supertest");

exports.getClassByAdmin = async (req) => {
  const { admin } = req.params;
  result = findClass = await Class.find({admin: admin})
  return result;
}

exports.ClassDelete = async (req) => {
  const { class_id } = req.params;
  const objId = new mongoose.Types.ObjectId(class_id);
  const result = await Class.findById({ _id: objId });
  const resulto = await Class.findByIdAndRemove(result);
  
  return resulto;
};

exports.GetClassById = async (req) => {
  const { class_id } = req.params;
  const objId = new mongoose.Types.ObjectId(class_id);
  const result = await Class.findById({ _id: objId });
  return result;
};

exports.GetClassByUserId = async (req) => {
  const { user_id } = req.params;
  const result = await Class.findOne({ admin: user_id });
  return result;
};

exports.ClassUpdate = async (req) => {
  const { classname, password } = req.body;
  const { class_id } = req.params;
  const objId = new mongoose.Types.ObjectId(class_id);
  const result = await Project.findById({ _id: objId });
  const resulto = await Project.findByIdAndUpdate(result, {
    classname: classname,
    password : password,
  });
  return resulto;
};


exports.MemberAdder = async (req, res) => {
  const {class_id}  = req.params;
  const {user_id} = req.body;

  const objId1 = new mongoose.Types.ObjectId(user_id);
  const result1 = await User.findById({ _id: objId1 });
  const Username = result1.username;
  console.log(Username);

  const Member = {
    id: user_id,
    username: Username
  }

  await Class.findOneAndUpdate(
    { _id: class_id },
    { $push: { members: Member } },
    { new: true }
  );
}

exports.Getprojects = async (req, res) => {
  const { class_id } = req.params;
  const objId = new mongoose.Types.ObjectId(class_id);
  const findClass = await Class.findById({ _id: objId });
  const Members = findClass.members
  const membersArr = []
  for(let i = 0; i < Members.length; i++) {
    let memberId = Members[i].id;
    let member = await Project.findOne({user_id: memberId})
    membersArr.push(member)
  }
  console.log(membersArr);
  return membersArr;
}

exports.GetMembers = async (req, res) => {
  const { class_id } = req.params;
  const objId = new mongoose.Types.ObjectId(class_id);
  const findClass = await Class.findById({ _id: objId });
  const Members = findClass.members
  const membersArr = []
  for(let i = 0; i < Members.length; i++) {
    let memberId = Members[i].id;
    let member = await User.findById({_id: memberId})
    membersArr.push(member)
  }
  console.log(membersArr);
  return membersArr;
}

exports.KickMember = async (req, res) => {
  const { class_id } = req.params;
  const { member_id } = req.params;
  await Class.updateOne({_id: class_id}, {
    $pull: {
      members: {id: member_id}
    }
  })
}