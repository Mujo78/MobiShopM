const { check } = require("express-validator");
const {
  POST_COMMENT,
  POST_NAME_COMMENT,
  POST_EMAIL_COMMENT,
  POST_INVALID_EMAIL_COMMENT,
} = require("../constants/comment-constants");

exports.createComment = [
  check("name").notEmpty().withMessage(POST_NAME_COMMENT).bail(),
  check("comment").notEmpty().withMessage(POST_COMMENT).bail(),
  check("email")
    .notEmpty()
    .withMessage(POST_EMAIL_COMMENT)
    .isEmail()
    .withMessage(POST_INVALID_EMAIL_COMMENT)
    .bail(),
];
