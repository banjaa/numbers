const express = require("express");
const {TokenCheckerMiddleware} = require("../helper/midtoken")

const {
  userPostController,
  userGetControllerById,
  userGetController,
  userDeleteController,
  userPutController,
  userGetControllerByEmail,
  LikeProjects,
  DisLikeProjects,
  userLogin,
  CreateNumbers,
  getNumbers,
  getUserByName

} = require("../controller/userController");
const { LIkeProject } = require("../query/userQuery");

const UserRouter = express
  .Router()
  .get("/user", userGetController)
  .get("/number", getNumbers)
  .post("/user", userPostController)
  .post("/number", CreateNumbers)
  .get("/user/:user_id", userGetControllerById)
  .delete("/user/:user_id", userDeleteController)
  .put("/user/:user_id", userPutController)
  .get("/userby_email/:email", userGetControllerByEmail)
  .get("/userby_name/:username", getUserByName)
  .put("/likeProject/:user_id", LikeProjects)
  .put("/dislikeProject/:user_id", DisLikeProjects)
  .post("/login", userLogin)
  
module.exports = UserRouter;
