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
} = require("../controllers/personController");
const {
  errorValidationMiddleware,
} = require("../middlewares/errorValidationMiddleware");

router.get("/users", adminMiddleware, getAllUsers);
router.get("/person/:id", adminMiddleware, getUserById);
router.patch("/edit-profile/:id", authMiddleware, editUserProfile);
router.delete("/delete-user/:id", authMiddleware, deleteProfile);

router.post(
  "/registration",
  createPersonValidator,
  errorValidationMiddleware,
  registration
);
router.post(
  "/add-admin",
  createAdminValidator,
  errorValidationMiddleware,
  addNewAdmin
);

module.exports = router;
