const { check } = require("express-validator");
const {
  POST_CART_QUANTITY,
  POST_QUANTITY_VALUE,
} = require("../constants/cart-constants");
const { Cart_item } = require("../models");

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

exports.editCartItemQuantityValidator = [
  check("quantity")
    .notEmpty()
    .withMessage(POST_CART_QUANTITY)
    .custom((value) => {
      if (parseInt(value) <= 0) {
        throw new Error(POST_QUANTITY_VALUE);
      }
      return true;
    })
    .custom(async (value, req) => {
      const itemId = req.req.params.itemId;
      const CartItem = await Cart_item.findByPk(itemId);

      if (parseInt(value) === CartItem.quantity) {
        throw new Error("Old value and new value cannot be equal!");
      }
      return true;
    })
    .bail(),
];
