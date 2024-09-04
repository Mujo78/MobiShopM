const express = require("express");
const router = express.Router();
const { adminMiddleware } = require("../middlewares/admin-check");
const {
  errorValidationMiddleware,
} = require("../middlewares/errorValidationMiddleware");
const { createComment } = require("../validators/comment");
const {
  getAllComments,
  getOneComment,
  addNewComment,
  deleteComment,
} = require("../controllers/commentController");

router.post(
  "/add-comment",
  createComment,
  errorValidationMiddleware,
  addNewComment
);

router.get("/comments", adminMiddleware, getAllComments);
router.get("/comment/:id", adminMiddleware, getOneComment);
router.delete("/delete-comment/:id", deleteComment);

module.exports = router;
