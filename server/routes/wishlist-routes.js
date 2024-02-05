const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware");
const {
  addToWishlist,
  deleteWishItemFromList,
  getWishlist,
} = require("../controllers/wishlistController");

router.get("/wishlist", authMiddleware, getWishlist);
router.post("/add-to-wishlist/:mobileId", authMiddleware, addToWishlist);
router.delete(
  "/delete-wishitem/:mobileId",
  authMiddleware,
  deleteWishItemFromList
);

module.exports = router;
