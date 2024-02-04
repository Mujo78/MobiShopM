const express = require("express");
const router = express.Router();
const { adminMiddleware } = require("../middlewares/admin-check");
const {
  errorValidationMiddleware,
} = require("../middlewares/errorValidationMiddleware");
const { createNewBrand } = require("../validators/brands");
const {
  getAllBrands,
  addNewBrand,
  deleteBrand,
} = require("../controllers/brandController");

router.get("/brands", getAllBrands);
router.delete("/delete-brand/:id", adminMiddleware, deleteBrand);
router.post(
  "/add-brand",
  adminMiddleware,
  createNewBrand,
  errorValidationMiddleware,
  addNewBrand
);

module.exports = router;
