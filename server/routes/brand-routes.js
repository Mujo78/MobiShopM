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

router.get("/", getAllBrands);

router.use(adminMiddleware);
router.post("/", createNewBrand, errorValidationMiddleware, addNewBrand);
router.delete("/:id", deleteBrand);

module.exports = router;
