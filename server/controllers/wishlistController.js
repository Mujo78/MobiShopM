const asyncHandler = require("express-async-handler");
const { Wishlist, Wish_item, Mobile } = require("../models");

const getWishlist = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const usersWishlist = await Wishlist.findOne({ where: { userId } });

  const wishlistItems = await Wish_item.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: { WishlistId: usersWishlist.id },
    include: {
      model: Mobile,
      attributes: [
        "mobile_name",
        "ram",
        "internal",
        "price",
        "photo",
        "processor",
      ],
    },
  });

  if (wishlistItems) return res.status(200).json(wishlistItems);

  res.status(400);
  return next(new Error("Something went wrong, please try again latter!"));
});

const addToWishlist = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const mobileId = req.params.mobileId;

  const [usersWishlist, created] = await Wishlist.findOrCreate({
    where: { userId },
  });

  try {
    const newWishItem = await Wish_item.create({
      wishlistId: usersWishlist.id,
      mobileId,
    });

    return res.status(200).json(newWishItem);
  } catch (error) {
    res.status(400);
    return next(new Error(error));
  }
});

const deleteWishItemFromList = asyncHandler(async (req, res, next) => {
  const mobileId = req.params.mobileId;

  const toDelete = await Wish_item.findOne({ where: { mobileId } });

  if (!toDelete) {
    res.status(400);
    return next(new Error("There was an error, please try again latter!"));
  }

  try {
    await toDelete.destroy();

    return res.status(200).json(toDelete.id);
  } catch (error) {
    res.status(400);
    return next(new Error(error));
  }
});

module.exports = {
  addToWishlist,
  deleteWishItemFromList,
  getWishlist,
};
