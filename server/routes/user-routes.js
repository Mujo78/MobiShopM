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

router.post("/", loginUser, errorValidationMiddleware, login);

router.get("/all", adminMiddleware, getAdmins);

router.use(authMiddleware);

router.patch(
  "/username",
  editUsername,
  errorValidationMiddleware,
  changeMyUsername
);

router.patch(
  "/password",
  changePasswordValidator,
  errorValidationMiddleware,
  changeMyPassword
);

module.exports = router;
