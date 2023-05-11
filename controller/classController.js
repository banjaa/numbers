const Class= require("../database/model/class");

const {
  CreateClass,
  ClassDelete,
  GetClassById,
  ClassUpdate,
  MemberAdder,
  Getprojects,
  GetMembers,
  KickMember
} = require("../query/classQuery")


exports.ClassGetController = async (req, res) => {
  const result = await Class.find().sort({_id: -1});
  res.status(201).send({ data: result });
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
  try {
    await CreateClass(req);
    res.status(201).send(" Successfully created new Class");
  } catch (err) {
    res.send(err.message);
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