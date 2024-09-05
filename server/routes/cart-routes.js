const express = require("express");
const { authMiddleware } = require("../middlewares/auth-middleware");
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

router.use(authMiddleware);

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
  authMiddleware,
  editCartItemQuantityValidator,
  errorValidationMiddleware,
  updateCartItem
);

router.delete("/:itemId", authMiddleware, deleteFromCart);

module.exports = router;
