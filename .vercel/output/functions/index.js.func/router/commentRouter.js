const express = require("express");

const {
  commentPutController,
  commentDeleteController,
  commentUpdateController,
} = require("../controller/commentController");

const UserRouter = express
  .Router()
  .put("/comment/:project_id", commentPutController)
  .delete("/comment/:project_id/:comment_id", commentDeleteController)
  .put("/comment_update/:project_id/:comment_id", commentUpdateController);
module.exports = UserRouter;
