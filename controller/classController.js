const Class= require("../database/model/class");
const User = require("../database/model/users");

const {
  CreateClass,
  ClassDelete,
  GetClassById,
  ClassUpdate,
  MemberAdder,
  Getprojects,
  GetMembers,
  KickMember,
  GetClassByUserId,
  GetClassByAdmin
} = require("../query/classQuery")


exports.ClassGetController = async (req, res) => {
  const result = await Class.find().sort({_id: -1});
  res.status(201).send({ data: result });
};

exports.GetClassByAdmin = async (req, res) => {
  const {admin} = req.params;
  const result = await Class.find({admin: admin}).sort({_id: -1});
  res.status(201).send({ data: result });
};

exports.GetClassByUserId = async (req, res) => {
  try {
    const result = await GetClassByUserId(req);
    res.status(201).send(result);
  } catch (err) {
    res.status(201).send(err.message);
  }
};

exports.ClassGetControllerById = async (req, res) => {
  try {
    const result = await GetClassById(req);
    res.status(201).send(result);
  } catch (err) {
    res.status(201).send(err.message);
  }
};

exports.ClassPostController = async (req, res) => {
  const { classname, password } = req.body;
  const { admin } = req.params
  const members = [];
  const projects = []
  const findUser = await User.findOne({_id: admin})
  const admin_name = findUser.username
  const findClass = await Class.findOne({classname: classname})
  if(findClass) {
    res.send("this class name is allready in use")
  } else {
    const result = await new Class({
   classname: classname,
   password : password,
   members: members,
   admin: admin,
   admin_name: admin_name,
   projects: projects
  }).save();
  console.log(result);
  res.send("succesfully added new class")
  }
};

exports.ClassDeleteController = async (req, res) => {
  try {
    await ClassDelete(req);
    res.status(201).send(" Successfully deleted Class");
  } catch (err) {
    res.send(err.message);
  }
};

exports.ClassPutController = async (req, res) => {
  try {
    await ClassUpdate(req);
    res.status(201).send(" Successfully updated Class");
  } catch (err) {
    res.send(err.message);
  }
};


exports.MemberAdderController = async (req, res) => {
  try {
    await MemberAdder(req);
    res.status(201).send(" Successfully added Member");
  } catch (err) {
    res.send(err.message);
  }
};

exports.GetProjectsController = async (req, res) => {
  try {
    const result = await Getprojects(req);
    res.status(201).send(result);
  } catch (err) {
    res.send(err.message);
  }
};

exports.GetMembersController = async (req, res) => {
  try {
    const result = await GetMembers(req);
    res.status(201).send(result);
  } catch (err) {
    res.send(err.message);
  }
};


exports.KickMemberController = async (req, res) => {
  try {
    const result = await KickMember(req);
    res.status(201).send("Successfuly kicked member");
  } catch (err) {
    res.send(err.message);
  }
};

exports.GetClassByMember = async (req, res) => {
  const {member_id} = req.params;
  const arr = [];
  const Classes = await Class.find();
  for(let i = 0; i < Classes.length; i++) {
    for(let j = 0; j < Classes[i].members.length; j++) {
      if(Classes[i].members[j].id === member_id) {
        arr.push(Classes[i])
      }
    }
  }
  res.send(arr)
}
