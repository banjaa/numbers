const express = require("express");

const {
    ProjectGetController,
    ProjectPostController,
    ProjectDeleteController,
    ProjectPutController,
    ProjectGetControllerById,
    getProjectByUserId,
    getProjectByClassId
} = require("../controller/projectController");
const { LikeProject } = require("../query/projectQuery");

const ProjectRouter = express
  .Router()
  .post("/project", ProjectPostController)
  .get("/project", ProjectGetController)
  .delete("/project/:project_id", ProjectDeleteController)
  .put("/project/:project_id", ProjectPutController)
  .get("/project/:project_id", ProjectGetControllerById)
  .get("/projectby_uid/:user_id", getProjectByUserId)
  .get("/projectby_class_id/:class_id", getProjectByClassId)
module.exports = ProjectRouter;
