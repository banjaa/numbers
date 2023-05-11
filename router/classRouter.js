const express = require("express");

const {
  ClassPostController,
  ClassGetController,
  ClassDeleteController,
  ClassPutController,
  ClassGetControllerById,
  MemberAdderController,
  GetProjectsController,
  GetMembersController,
  KickMemberController
} = require("../controller/classController");

const ClassRouter = express
  .Router()
  .get("/class", ClassGetController)
  .post('/class/:admin', ClassPostController)
  .delete("/class/:class_id", ClassDeleteController)
  .put("/class/:class_id", ClassPutController)
  .get("/class/:class_id", ClassGetControllerById)
  .put("/member/:class_id", MemberAdderController)
  .get("/get_project/:class_id", GetProjectsController)
  .get("/get_members/:class_id", GetMembersController)
  .delete("/member/:class_id/:member_id", KickMemberController)
module.exports = ClassRouter;
