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
  POST_BATTERY_MOBILE_TYPE,
  POST_MEMORY_MOBILE_TYPE,
  POST_MEMORY_MOBILE_VALID,
  POST_PRICE_MOBILE_TYPE,
  POST_RAM_MOBILE_TYPE,
  POST_RAM_MOBILE_VALID,
  POST_SCREENSIZE_MOBILE_TYPE,
} = require("../constants/mobile-constants");
const { ram, memory } = require("./utils");

exports.createOrEditMobitelValidator = [
  check("mobile_name").notEmpty().withMessage(POST_MOBILENAME_MOBILE).bail(),
  check("ram")
    .notEmpty()
    .withMessage(POST_RAM_MOBILE)
    .isNumeric()
    .withMessage(POST_RAM_MOBILE_TYPE)
    .custom((value) => {
      if (ram.includes(value)) {
        return true;
      }
      throw new Error(POST_RAM_MOBILE_VALID);
    })
    .bail(),
  check("internal")
    .notEmpty()
    .withMessage(POST_MEMORY_MOBILE)
    .isNumeric()
    .withMessage(POST_MEMORY_MOBILE_TYPE)
    .custom((value) => {
      if (memory.includes(value)) {
        return true;
      }
      throw new Error(POST_MEMORY_MOBILE_VALID);
    })
    .bail(),
  check("processor").notEmpty().withMessage(POST_PROCESSOR_MOBILE).bail(),
  check("screen_size")
    .notEmpty()
    .withMessage(POST_SCREENSIZE_MOBILE)
    .isNumeric()
    .withMessage(POST_SCREENSIZE_MOBILE_TYPE)
    .bail(),
  check("battery")
    .notEmpty()
    .withMessage(POST_BATTERY_MOBILE)
    .isNumeric()
    .withMessage(POST_BATTERY_MOBILE_TYPE)
    .bail(),
  check("photo").notEmpty().withMessage(POST_PHOTO_MOBILE).bail(),
  check("os").notEmpty().withMessage(POST_OS_MOBILE).bail(),
  check("camera").notEmpty().withMessage(POST_CAMERA_MOBILE).bail(),
  check("quantity").notEmpty().withMessage(POST_QUANTITY_MOBILE).bail(),
  check("price")
    .notEmpty()
    .withMessage(POST_PRICE_MOBILE)
    .isNumeric()
    .withMessage(POST_PRICE_MOBILE_TYPE)
    .bail(),
  check("brandId").notEmpty().withMessage(POST_BRAND_MOBILE).bail(),
];
