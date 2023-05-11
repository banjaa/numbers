const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  classname: {
    type: String,
    required: true,
    minlength: [3, "calss name length must be at least 3 characters"],
    maxlength: [10, "calss name length must be 3 to 20 characters"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "password length is too short"],
  },
  admin: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    required: true
  },
  createdAt: { type: Date, default: Date.now() },
});

const ClassModel = mongoose.model("Class", ClassSchema);

module.exports = ClassModel;
