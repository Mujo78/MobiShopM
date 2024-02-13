const express = require("express");
const router = express.Router();
const { adminMiddleware } = require("../middlewares/admin-check");
const { authMiddleware } = require("../middlewares/auth-middleware");
const {
  createPersonValidator,
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

router.get("/users", getAllUsers);
router.get("/person", authMiddleware, getUserById);
router.patch("/edit-profile", authMiddleware, editUserProfile);
router.delete("/delete-profile", authMiddleware, deleteProfile);

router.post(
  "/registration",
  createPersonValidator,
  errorValidationMiddleware,
  registration
);
router.post(
  "/add-admin",
  adminMiddleware,
  createAdminValidator,
  errorValidationMiddleware,
  addNewAdmin
);

router.delete("/delete/:adminId", adminMiddleware, deleteAdmin);

module.exports = router;
