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
  getMobileByName,
} = require("../controllers/mobileController");
const {
  errorValidationMiddleware,
} = require("../middlewares/errorValidationMiddleware");

router.get("/", getAllMobiles);
router.get("/top-prices", getMobilesByTopPrices);
router.get("/:mobileId", getMobileById);
router.get("/brand/:brandId", getMobilesByBrandId);

router.use(adminMiddleware);

router.get("/admin/search", getMobileByName);
router.post(
  "/",
  createMobitelValidator,
  errorValidationMiddleware,
  addNewMobile
);

router.put("/:mobileId", editMobile);
router.delete("/:mobileId", deleteMobile);

module.exports = router;
