const express = require("express");
const { authorized, restrictTo } = require("../middlewares/auth-middleware");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  deleteFromCart,
  updateCartItem,
  getCartItem,
} = require("../controllers/cartController");
const {
  addToCartValidator,
  editCartItemQuantityValidator,
} = require("../validators/cart");
const {
  errorValidationMiddleware,
} = require("../middlewares/errorValidationMiddleware");

router.use(authorized, restrictTo("USER"));

router.get("/", getCartItems);
router.get("/:itemId", getCartItem);

router.post(
  "/:mobileId",
  addToCartValidator,
  errorValidationMiddleware,
  addToCart
);

router.patch(
  "/:itemId",
  editCartItemQuantityValidator,
  errorValidationMiddleware,
  updateCartItem
);

router.delete("/:itemId", deleteFromCart);

module.exports = router;
