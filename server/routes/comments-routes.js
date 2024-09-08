const express = require("express");
const router = express.Router();
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
const { authorized, restrictTo } = require("../middlewares/auth-middleware");

router.post("/", createComment, errorValidationMiddleware, addNewComment);

router.use(authorized, restrictTo("ADMIN"));

router.get("/", getAllComments);
router.get("/:id", getOneComment);
router.delete("/:id", deleteComment);

module.exports = router;
