const asyncHandler = require("express-async-handler");
const { Comment } = require("../models");
const { getAll, getOne, deleteOne } = require("./handleController");

const getAllComments = getAll(Comment);
const getOneComment = getOne(Comment);

const addNewComment = asyncHandler(async (req, res) => {
  const { name, comment } = req.body;

  const newComment = await Comment.create({
    name,
    comment,
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
