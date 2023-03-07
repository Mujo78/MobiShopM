const {check} = require("express-validator")
const {
    POST_COMMENT,
    POST_EMAIL_COMMENT,
    POST_IME_COMMENT
} = require("../constants/comment-constants")

exports.createComment = [
    check("ime")
        .notEmpty()
        .withMessage(POST_IME_COMMENT)
        .bail(),
    check("email")
        .notEmpty()
        .withMessage(POST_EMAIL_COMMENT)
        .bail(),
    check("comment")
        .notEmpty()
        .withMessage(POST_COMMENT)
        .bail()
]