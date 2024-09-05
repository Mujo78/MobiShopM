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

router.post(
  "/",
  createPersonValidator,
  errorValidationMiddleware,
  registration
);

router.use(authMiddleware);

router.get("/", getUserById);
router.patch("/", editUserProfile);
router.delete("/", deleteProfile);

router.use(adminMiddleware);

router.get("/all", getAllUsers);
router.post(
  "/admin",
  createAdminValidator,
  errorValidationMiddleware,
  addNewAdmin
);

router.delete("/:adminId", deleteAdmin);

module.exports = router;
