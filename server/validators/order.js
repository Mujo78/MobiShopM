const { check } = require("express-validator");
const {
  POST_ORDER_QUANTITY,
  ORDER_PAYMENT_INFO,
  PAYMENT_INFO_CHOICE,
  POST_QUANTITY_VALUE,
} = require("../constants/order-constants");

exports.buyNowValidator = [
  check("payment_info")
    .notEmpty()
    .withMessage(ORDER_PAYMENT_INFO)
    .custom((value) => {
      if (value === "Card" || value === "Delivery") {
        return true;
      }
      throw new Error(PAYMENT_INFO_CHOICE);
    })
    .bail(),
  check("quantity")
    .notEmpty()
    .withMessage(POST_ORDER_QUANTITY)
    .custom((value) => {
      if (parseInt(value) <= 0) {
        throw new Error(POST_QUANTITY_VALUE);
      }
      return true;
    })
    .bail(),
];

exports.buyCartItemValidator = [
  check("payment_info")
    .notEmpty()
    .withMessage(ORDER_PAYMENT_INFO)
    .custom((value) => {
      if (value === "Card" || value === "Delivery") {
        return true;
      }
      throw new Error(PAYMENT_INFO_CHOICE);
    })
    .bail(),
];
