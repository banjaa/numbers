const Project = require("../database/model/project");
const Class= require("../database/model/class");
const User = require("../database/model/users");
const bcrypt = require("bcrypt");

const {
  ProjectDelete,
  ProjectUpdate,
  GetProjectById,
  GetProjectByUserId,
  GetProjectByClassId
} = require("../query/projectQuery");


exports.ProjectGetController = async (req, res) => {
  const result = await Project.find().sort({_id: -1});
  res.status(201).send({ data: result });
};

exports.ProjectGetControllerById = async (req, res) => {
  try {
    const result = await GetProjectById(req);
    res.status(201).send(result);
  } catch (err) {
    res.status(201).send(err.message);
  }
};

exports.getProjectByUserId = async (req, res) => {
  try {
    const result = await GetProjectByUserId(req);
    res.status(201).send(result);
  } catch (err) {
    res.status(201).send(err.message);
  }
};

exports.getProjectByClassId = async (req, res) => {
  try {
    const result = await GetProjectByClassId(req);
    res.status(201).send(result);
  } catch (err) {
    res.status(201).send(err.message);
  }
};

exports.ProjectPostController = async (req, res) => {
  try {
      const { url, title, word, classname, user_id, img_url } = req.body;
  const comments = [];
  const likes = 0;
  const findClass = await Class.findOne({classname: classname})
  const class_id = findClass._id;
  const findUser = await User.findOne({_id: user_id})
  const username = findUser.username;
  let isMember = "false"
  
  if(findClass.admin == user_id) {
    isMember = "true"
  } else {
    for(let i = 0; i < findClass.members.length; i++) {
      if(findClass.members[i].id == user_id) {
        isMember = "true"
      }
    }
  }
  
  if(isMember == "true") {
    const result = await new Project({
      user_id: user_id,
      url: url,
      title: title,
      word: word,
      classname: classname,
      img_url: img_url,
      class_id: class_id,
      comments: comments,
      likes: likes,
      username: username,
    }).save();

    const project_id = result._id;
    const projectId = project_id.toString()
    await Class.findOneAndUpdate(
      { _id: class_id },
      { $push: { projects: {project_id: projectId} } },
      { new: true }
    );
    res.send("Successfully added project")
    console.log(result);
    return result;
  } else {
    res.send("you're not member of this class")
  }
  } catch (err) {
    res.send("there is no such class like this");
  }

};

exports.ProjectDeleteController = async (req, res) => {
  try {
    await ProjectDelete(req);
    res.status(201).send(" Successfully deleted Project");
  } catch (err) {
    res.send(err.message);
  }
};

exports.ProjectPutController = async (req, res) => {
  try {
    await ProjectUpdate(req);
    res.status(201).send(" Successfully updated Project");
  } catch (err) {
    res.send(err.message);
  }
};


