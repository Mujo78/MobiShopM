const { check } = require("express-validator");
const {
  POST_USERNAME_USER,
  POST_PASSWORD_USER,
  USER_OLD_PASSWORD,
  USER_NEW_PASSWORD,
  USER_CONFIRM_PASSWORD,
  POST_USERNAME_USER_LENGTH_MAX,
  POST_USERNAME_USER_LENGTH_MIN,
  POST_NEW_PASSWORD_LENGTH,
  POST_NEW_PASSWORD_WEAK,
} = require("../constants/user-constants");
const { regPattern } = require("./utils");

exports.loginUser = [
  check("username").notEmpty().withMessage(POST_USERNAME_USER).bail(),
  check("password").notEmpty().withMessage(POST_PASSWORD_USER).bail(),
];

exports.editUsername = [
  check("username")
    .notEmpty()
    .withMessage(POST_USERNAME_USER)
    .isLength({ min: 6 })
    .withMessage(POST_USERNAME_USER_LENGTH_MIN)
    .isLength({ max: 32 })
    .withMessage(POST_USERNAME_USER_LENGTH_MAX)
    .bail(),
];

exports.changePasswordValidator = [
  check("password").notEmpty().withMessage(USER_OLD_PASSWORD).bail(),
  check("newPassword")
    .notEmpty()
    .withMessage(USER_NEW_PASSWORD)
    .isLength({ min: 8 })
    .withMessage(POST_NEW_PASSWORD_LENGTH)
    .custom((value) => {
      if (value === "") {
        return true;
      }
      return regPattern.test(value);
    })
    .withMessage(POST_NEW_PASSWORD_WEAK)
    .bail(),
  check("confirmPassword").notEmpty().withMessage(USER_CONFIRM_PASSWORD).bail(),
];
