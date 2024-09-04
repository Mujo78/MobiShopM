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

  return res.status(200).json({
    data: rows,
    numOfPages: Math.ceil(count / limit),
    currentPage: page,
  });
});
const getOneComment = getOne(Comment);

const addNewComment = asyncHandler(async (req, res) => {
  const { name, comment, email } = req.body;

  await Comment.create({
    name,
    comment,
    email,
  });

  return res.status(201).json();
});

const deleteComment = deleteOne(Comment);

module.exports = {
  getAllComments,
  getOneComment,
  addNewComment,
  deleteComment,
};
