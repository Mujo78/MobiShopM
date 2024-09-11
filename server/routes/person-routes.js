const express = require("express");
const router = express.Router();
const { authorized, restrictTo } = require("../middlewares/auth-middleware");
const {
  createPersonValidator,
  editProfileValidator,
  createAdminValidator,
} = require("../validators/person");
const {
  registration,
  getAllUsers,
  deleteProfile,
  getUserById,
  editUserProfile,
  addNewAdmin,
  deleteAdmin,
} = require("../controllers/personController");
const {
  errorValidationMiddleware,
} = require("../middlewares/errorValidationMiddleware");

router.post(
  "/",
  createPersonValidator,
  errorValidationMiddleware,
  registration
);

router.use(authorized);

router.get("/", getUserById);
router.put(
  "/",
  editProfileValidator,
  errorValidationMiddleware,
  editUserProfile
);
router.delete("/", deleteProfile);

router.use(restrictTo("ADMIN"));

router.get("/all", getAllUsers);
router.post(
  "/admin",
  createAdminValidator,
  errorValidationMiddleware,
  addNewAdmin
);

router.delete("/:adminId", deleteAdmin);

module.exports = router;
