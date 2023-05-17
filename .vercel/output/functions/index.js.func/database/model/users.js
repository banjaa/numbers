const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "username length must be at least 3 characters"],
    maxlength: [20, "username length must be 3 to 20 characters"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "password length is too short"],
  },
  about: {
    type: String,
    required: true,
    minlength: [5, "about your self length is too short"],
    maxlength: [40, "about your self length must be 6 to 40 characters"],
    required: false
  },
  email: { type: String, required: true },
  liked_projects: {type: Array, required: true},
  projects: {
    type: Number,
    required: true
  },
  createdAt: { type: Date, default: Date.now() },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
