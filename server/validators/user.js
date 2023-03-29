const { check } = require("express-validator")
const {
    POST_USERNAME_USER,
    POST_PASSWORD_USER,
    USER_DOESNT_EXISTS
}  = require("../constants/user-constants")

exports.loginUser = [
    check("username")
        .notEmpty()
        .withMessage(POST_USERNAME_USER)
        .bail(),
    check("password")
        .notEmpty()
        .withMessage(POST_PASSWORD_USER)
        .bail()
]