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

router.post("/", createComment, errorValidationMiddleware, addNewComment);

router.use(adminMiddleware);

router.get("/", getAllComments);
router.get("/:id", getOneComment);
router.delete("/:id", deleteComment);

module.exports = router;
