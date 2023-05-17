const Project = require("../database/model/project");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


exports.AddCommment = async (req, res) => {
  const { project_id } = req.params;
  const { comment } = req.body;
  const createdAt = new Date(Date.now());
  const objId = new mongoose.Types.ObjectId(project_id);
  const result = await Project.findById({ _id: objId });

  const CommentId = makeid(30)
  
  const Comment = {
    comment_id: CommentId,
    comment: comment,
    created_at: createdAt
  }
  
  const resulto = await Project.findOneAndUpdate(
    { _id: project_id },
    { $push: { comments: Comment } },
    { new: true }
  );
  console.log(resulto);
  return resulto;
};

exports.CommentDelete = async (req, res) => {
  const { project_id } = req.params;
  const { comment_id } = req.params;
  await Project.updateOne({_id: project_id}, {
    $pull: {
      comments: {comment_id: comment_id}
    }
  })
};

exports.CommentUpdate = async (req, res) => {
  const { project_id } = req.params;
  const { comment_id } = req.params;
  const { comment } = req.body;
  const myProject = await Project.findById({ _id: project_id });
  let i = 0;
  myProject.comments.map((commento) => {
    console.log(commento);
    if (commento[i].comment_id == comment_id) {
      myProject.comments[i].comment = comment;
    } else {
      i += 1;
    }
  });

  const result = await Project.findByIdAndUpdate(
    { _id: project_id },
    { comment: myProject.comments },
    { new: true }
  );

  return result;
};
