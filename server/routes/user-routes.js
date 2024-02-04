const express = require("express");
const router = express.Router();
const {
  loginUser,
  editUsername,
  changePasswordValidator,
} = require("../validators/user");
const { authMiddleware } = require("../middlewares/auth-middleware");
const { adminMiddleware } = require("../middlewares/admin-check");
const {
  errorValidationMiddleware,
} = require("../middlewares/errorValidationMiddleware");
const {
  getAdmins,
  changeMyPassword,
  changeMyUsername,
  login,
} = require("../controllers/userController");

router.post("/login", loginUser, errorValidationMiddleware, login);

router.patch(
  "/change-username",
  authMiddleware,
  editUsername,
  errorValidationMiddleware,
  changeMyUsername
);

router.patch(
  "/change-password",
  authMiddleware,
  changePasswordValidator,
  errorValidationMiddleware,
  changeMyPassword
);

router.get("/all-admins", adminMiddleware, getAdmins);

module.exports = router;
