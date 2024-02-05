const express = require("express");
const { authMiddleware } = require("../middlewares/auth-middleware");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  deleteFromCart,
} = require("../controllers/cartController");
const { addToCartValidator } = require("../validators/cart");
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

router.delete("/delete-item/:mobileId", authMiddleware, deleteFromCart);

module.exports = router;
