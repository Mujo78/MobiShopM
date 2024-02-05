const { check } = require("express-validator");
const {
  POST_BATTERY_MOBILE,
  POST_PRICE_MOBILE,
  POST_SCREENSIZE_MOBILE,
  POST_RAM_MOBILE,
  POST_PROCESSOR_MOBILE,
  POST_CAMERA_MOBILE,
  POST_MOBILENAME_MOBILE,
  POST_PHOTO_MOBILE,
  POST_OS_MOBILE,
  POST_MEMORY_MOBILE,
  POST_BRAND_MOBILE,
  POST_QUANTITY_MOBILE,
} = require("../constants/mobile-constants");

exports.createMobitelValidator = [
  check("mobile_name").notEmpty().withMessage(POST_MOBILENAME_MOBILE).bail(),
  check("ram").notEmpty().withMessage(POST_RAM_MOBILE).bail(),
  check("internal").notEmpty().withMessage(POST_MEMORY_MOBILE).bail(),
  check("processor").notEmpty().withMessage(POST_PROCESSOR_MOBILE).bail(),
  check("screen_size").notEmpty().withMessage(POST_SCREENSIZE_MOBILE).bail(),
  check("battery").notEmpty().withMessage(POST_BATTERY_MOBILE).bail(),
  check("photo").notEmpty().withMessage(POST_PHOTO_MOBILE).bail(),
  check("os").notEmpty().withMessage(POST_OS_MOBILE).bail(),
  check("camera").notEmpty().withMessage(POST_CAMERA_MOBILE).bail(),
  check("quantity").notEmpty().withMessage(POST_QUANTITY_MOBILE).bail(),
  check("price").notEmpty().withMessage(POST_PRICE_MOBILE).bail(),
  check("brandId").notEmpty().withMessage(POST_BRAND_MOBILE).bail(),
];
