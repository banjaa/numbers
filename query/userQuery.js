const User = require("../database/model/users");
const Test = require("../database/model/test")
const Project = require("../database/model/project");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const request = require("supertest");

exports.GetUserById = async (req) => {
  const { user_id } = req.params;
  const objId = new mongoose.Types.ObjectId(user_id);
  const result = await User.findById({ _id: objId });
  return result;
};

exports.GetUserByEmail = async (req) => {
  const { email } = req.params;
  const result = await User.findOne({ email: email });
  return result;
};

exports.GetUser = async () => {
  const result = await User.find();
  return result;
};

exports.CreateUser = async (req) => {
  const { username, password, email, about } = req.body;
  const salt = bcrypt.genSaltSync(1);
  const hash = bcrypt.hashSync(password, salt);
  const liked_projects = [];
  const created_projects = []
  console.log(hash);
  const result = await new User({
    username: username,
    password: hash,
    email: email,
    about: about,
    liked_projects: liked_projects
  }).save();
  console.log(result);
  return result;
};

exports.CreateNumber = async (req) => {
  const { number } = req.body;
  await new Test({
    number: number
  }).save();
  const result = Test.find().sort({_id: -1})
  console.log(result);
  return result;
};

exports.UserDelete = async (req) => {
  const { user_id } = req.params;
  const objId = new mongoose.Types.ObjectId(user_id);
  const result = await User.findById({ _id: objId });
  const resulto = await User.findByIdAndRemove(result);
  return resulto;
};

exports.UserUpdate = async (req) => {
  const { user_id } = req.params;
  const objId = new mongoose.Types.ObjectId(user_id);
  const result = await User.findById({ _id: objId });
  const { username, password, email } = req.body;
  const salt = bcrypt.genSaltSync(1);
  const hash = bcrypt.hashSync(password, salt);
  const resulto = await User.findByIdAndUpdate(result, {
    username: username,
    password: hash,
    email: email,
  });
  return resulto;
};

exports.LIkeProject = async (req) => {
  const { user_id } = req.params;
  const { project_id } = req.body;
  const project = await Project.findById(project_id);
  const previousLike = project.likes;
  
  await Project.findByIdAndUpdate(project_id,{
    likes: previousLike + 1
  })
  
  const resulto = await User.findByIdAndUpdate(
    { _id: user_id },
    { $push: { liked_projects: project_id } },
    { new: true }
  );
  console.log(resulto);
  return resulto;
}

exports.DisLIkeProject = async (req) => {
  const { user_id } = req.params;
  const { project_id } = req.body;
  const project = await Project.findById(project_id);
  const previousLike = project.likes;
  
  await Project.findByIdAndUpdate(project_id,{
    likes: previousLike - 1
  })
  
  const resulto = await User.findByIdAndUpdate(
    { _id: user_id },
    { $pull: { liked_projects: project_id } },
  );
  console.log(resulto);
  return resulto;
}
