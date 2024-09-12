const { check } = require("express-validator");
const { POST_BRAND_NAME } = require("../constants/brand-constants");

exports.createNewBrand = [
  check("name").notEmpty().withMessage(POST_BRAND_NAME).bail(),
];
