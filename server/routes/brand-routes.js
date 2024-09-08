const express = require("express");
const router = express.Router();
const {
  errorValidationMiddleware,
} = require("../middlewares/errorValidationMiddleware");
const { createNewBrand } = require("../validators/brands");
const {
  getAllBrands,
  addNewBrand,
  deleteBrand,
} = require("../controllers/brandController");
const { restrictTo, authorized } = require("../middlewares/auth-middleware");

router.get("/", getAllBrands);

router.use(authorized, restrictTo("ADMIN"));
router.post("/", createNewBrand, errorValidationMiddleware, addNewBrand);
router.delete("/:id", deleteBrand);

module.exports = router;
