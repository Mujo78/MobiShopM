const express = require("express");
const router = express.Router();
const { createMobitelValidator } = require("../validators/mobile");
const { adminMiddleware } = require("../middlewares/admin-check");
const {
  getAllMobiles,
  getMobilesByTopPrices,
  getMobileById,
  addNewMobile,
  deleteMobile,
  editMobile,
  getMobilesByBrandId,
  searchMobileByName,
} = require("../controllers/mobileController");
const {
  errorValidationMiddleware,
} = require("../middlewares/errorValidationMiddleware");

router.get("/mobiles", getAllMobiles);
router.get("/mobiles-top-prices", getMobilesByTopPrices);
router.get("/mobile-phone/:mobileId", getMobileById);
router.get("/brand-mobiles/:brandId", getMobilesByBrandId);
router.get("/search-mobile-name", adminMiddleware, searchMobileByName);

router.post(
  "/add-mobile",
  adminMiddleware,
  createMobitelValidator,
  errorValidationMiddleware,
  addNewMobile
);

router.put("/edit-mobile/:mobileId", adminMiddleware, editMobile);
router.delete("/delete-mobile/:mobileId", adminMiddleware, deleteMobile);

module.exports = router;
