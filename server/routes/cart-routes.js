const express = require("express");
const { authMiddleware } = require("../middlewares/auth-middleware");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  deleteFromCart,
  updateCartItem,
} = require("../controllers/cartController");
const {
  addToCartValidator,
  editCartItemQuantityValidator,
} = require("../validators/cart");
const {
  errorValidationMiddleware,
} = require("../middlewares/errorValidationMiddleware");

router.get("/cart", authMiddleware, getCartItems);

router.post(
  "/add-to-cart/:mobileId",
  authMiddleware,
  addToCartValidator,
  errorValidationMiddleware,
  addToCart
);

router.patch(
  "/update-cart-item/:itemId",
  authMiddleware,
  editCartItemQuantityValidator,
  errorValidationMiddleware,
  updateCartItem
);

router.delete("/delete-item/:itemId", authMiddleware, deleteFromCart);

module.exports = router;
