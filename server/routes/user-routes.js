const express = require("express");
const router = express.Router();
const {
  loginUser,
  editUsername,
  changePasswordValidator,
} = require("../validators/user");
const { authorized, restrictTo } = require("../middlewares/auth-middleware");
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

router.use(authorized);

router.get("/all", restrictTo("ADMIN"), getAdmins);

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
