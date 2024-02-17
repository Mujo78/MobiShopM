const asyncHandler = require("express-async-handler");
const { Comment } = require("../models");
const { getOne, deleteOne } = require("./handleController");

const getAllComments = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 3;
  const offset = (page - 1) * limit;

  const { count, rows } = await Comment.findAndCountAll({
    order: [["createdAt", "DESC"]],
    offset,
    limit,
  });

  let resObj = {
    data: rows,
    numOfPages: Math.ceil(count / limit),
    currentPage: page,
  };

  if (rows) return res.status(200).json(resObj);

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
