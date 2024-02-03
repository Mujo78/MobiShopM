const express = require("express");
const { validationResult, check } = require("express-validator");
const router = express.Router();
const { createMobitelValidator } = require("../validators/mobile");
const { Mobile, Brand } = require("../models");
const { adminMiddleware } = require("../middlewares/admin-check");
const { authMiddleware } = require("../middlewares/auth-middleware");
const brand = require("../models/brand");
const {
  getAllMobiles,
  getMobilesByTopPrices,
  getMobileById,
  addNewMobile,
  deleteMobile,
  editMobile,
  getMobilesByBrandId,
} = require("../controllers/mobileController");
const {
  errorValidationMiddleware,
} = require("../middlewares/errorValidationMiddleware");

router.get("/mobiles", getAllMobiles);
router.get("/mobiles-top-prices", getMobilesByTopPrices);
router.get("/mobile-phone/:id", getMobileById);
router.get("/brand-mobiles/:brandId", getMobilesByBrandId);

router.post(
  "/add-mobile",
  adminMiddleware,
  createMobitelValidator,
  errorValidationMiddleware,
  addNewMobile
);

router.put("/edit-mobile/:mobileId", adminMiddleware, editMobile);
router.delete("/delete-mobile/:mobileId", deleteMobile);

module.exports = router;
