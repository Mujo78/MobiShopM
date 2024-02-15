const asyncHandler = require("express-async-handler");
const { Comment } = require("../models");
const { getOne, deleteOne } = require("./handleController");

const getAllComments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.findAll({
    order: [["createdAt", "DESC"]],
  });

  if (comments) return res.status(200).json(comments);

  res.status(400);
  return next(new Error("There was an error, please try again later!"));
});
const getOneComment = getOne(Comment);

const addNewComment = asyncHandler(async (req, res) => {
  const { name, comment, email } = req.body;

  const newComment = await Comment.create({
    name,
    comment,
    email,
  });

  if (newComment)
    return res.status(201).json({ message: "Comment successfully created!" });

  res.status(400);
  return next(new Error("Something went wrong, please try again latter!"));
});

const deleteComment = deleteOne(Comment);

module.exports = {
  getAllComments,
  getOneComment,
  addNewComment,
  deleteComment,
};
