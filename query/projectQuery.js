const Project = require("../database/model/project");
const Class= require("../database/model/class");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const request = require("supertest");

exports.CreateProject = async (req) => {
  const { url, title, word, classname, user_id } = req.body;
  const comments = [];
  const likes = 0;
  const findClassId = await Class.findOne({classname: classname})
  const class_id = findClassId._id;
  const result = await new Project({
    user_id: user_id,
    url: url,
    title: title,
    word: word,
    classname: classname,
    class_id: class_id,
    comments: comments,
    likes: likes
  }).save();
  console.log(result);
  return result;
};

exports.ProjectDelete = async (req) => {
  const { project_id } = req.params;
  const objId = new mongoose.Types.ObjectId(project_id);
  const result = await Project.findById({ _id: objId });
  const resulto = await Project.findByIdAndRemove(result);
  return resulto;
};

exports.GetProjectById = async (req) => {
  const { project_id } = req.params;
  const objId = new mongoose.Types.ObjectId(project_id);
  const result = await Project.findById({ _id: objId });
  return result;
};

exports.ProjectUpdate = async (req) => {
  const { project_id } = req.params;
  const objId = new mongoose.Types.ObjectId(project_id);
  const result = await Project.findById({ _id: objId });
  const { url, title, word } = req.body;
  const resulto = await Project.findByIdAndUpdate(result, {
    url: url,
    title: title,
    word: word,
  });
  return resulto;
};