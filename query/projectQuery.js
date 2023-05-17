const Project = require("../database/model/project");
const Class= require("../database/model/class");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const request = require("supertest");

exports.ProjectDelete = async (req) => {
  const { project_id } = req.params;
  const objId = new mongoose.Types.ObjectId(project_id);
  const result = await Project.findById({ _id: objId });
  const resulto = await Project.findByIdAndRemove(result);
  const findClass = await Class.findOne({projects : {project_id: project_id}})
  class_id = findClass._id
  console.log(findClass);
  await Class.updateOne({_id: class_id}, {
    $pull: {
      projects: {project_id: project_id}
    }
  })

  return resulto;
};

exports.GetProjectById = async (req) => {
  const { project_id } = req.params;
  const objId = new mongoose.Types.ObjectId(project_id);
  const result = await Project.findById({ _id: objId });
  return result;
};

exports.GetProjectByClassId = async (req) => {
  const { class_id } = req.params;
  const result = await Project.find({ class_id: class_id });
  return result;
};

exports.GetProjectByUserId = async (req) => {
  const { user_id } = req.params;
  const result = await Project.find({ user_id: user_id }).sort({_id: -1});
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