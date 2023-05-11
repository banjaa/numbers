const mongoose = require("mongoose");

const Project = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: [5, "title length must be at least 6 characters"],
    maxlength: [20, "title length must be 6 to 20 characters"],
  },
  word: {
    type: String,
    required: true,
    maxlength: [150, "paragraph length must be 6 to 150 characters"],
  },
  url: {
    type: String,
    required: true,
  },
  classname: {
    type: String,
    required: true
  },
  class_id: {
    type: String,
    required: true
  },
  comments: {
    type: Array,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  createdAt: { type: Date, default: Date.now() },
});

const ProjectModel = mongoose.model("Project", Project);

module.exports = ProjectModel;
