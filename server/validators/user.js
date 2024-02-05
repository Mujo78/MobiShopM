const { check } = require("express-validator");
const {
  POST_USERNAME_USER,
  POST_PASSWORD_USER,
  USER_OLD_PASSWORD,
  USER_NEW_PASSWORD,
  USER_CONFIRM_PASSWORD,
} = require("../constants/user-constants");
const { User } = require("../models");
const { USER_ALREADY_EXISTS } = require("../constants/person-constants");

exports.loginUser = [
  check("username").notEmpty().withMessage(POST_USERNAME_USER).bail(),
  check("password").notEmpty().withMessage(POST_PASSWORD_USER).bail(),
];

exports.editUsername = [
  check("username")
    .notEmpty()
    .withMessage(POST_USERNAME_USER)
    .custom(async (n) => {
      const users = await User.findOne({ where: { username: n } });
      if (users != null) {
        return Promise.reject(USER_ALREADY_EXISTS(n));
      }
    })
    .bail(),
];

exports.changePasswordValidator = [
  check("password").notEmpty().withMessage(USER_OLD_PASSWORD).bail(),
  check("newPassword").notEmpty().withMessage(USER_NEW_PASSWORD).bail(),
  check("confirmPassword").notEmpty().withMessage(USER_CONFIRM_PASSWORD).bail(),
];
