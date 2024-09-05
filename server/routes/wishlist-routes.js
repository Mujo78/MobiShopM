const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware");
const {
  addToWishlist,
  deleteWishItemFromList,
  getWishlist,
  getWishlistItemsDetails,
} = require("../controllers/wishlistController");

router.use(authMiddleware);

router.get("/", getWishlist);
router.get("/details", getWishlistItemsDetails);
router.post("/:mobileId", addToWishlist);
router.delete("/:mobileId", deleteWishItemFromList);

module.exports = router;
