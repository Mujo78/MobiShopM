const { check } = require("express-validator");
const {
  POST_CART_QUANTITY,
  POST_QUANTITY_VALUE,
} = require("../constants/cart-constants");

exports.addToCartValidator = [
  check("quantity")
    .notEmpty()
    .withMessage(POST_CART_QUANTITY)
    .custom((value) => {
      if (parseInt(value) <= 0) {
        throw new Error(POST_QUANTITY_VALUE);
      }
      return true;
    })
    .bail(),
];
