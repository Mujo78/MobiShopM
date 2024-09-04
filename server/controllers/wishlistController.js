const asyncHandler = require("express-async-handler");
const { Wishlist, Wish_item, Mobile } = require("../models");

const getWishlist = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const [usersWishlist, created] = await Wishlist.findOrCreate({
    where: { userId },
  });

  const wishlistItems = await Wish_item.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: { wishlistId: usersWishlist.id },
  });

  return res.status(200).json(wishlistItems);
});

const getWishlistItemsDetails = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = 2;
  const offset = (page - 1) * limit;

  const [usersWishlist, created] = await Wishlist.findOrCreate({
    where: { userId },
  });

  const resObj = {};

  const wishlistItems = await Wish_item.findAll({
    offset,
    limit,
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: { wishlistId: usersWishlist.id },
    include: {
      model: Mobile,
      attributes: [
        "mobile_name",
        "ram",
        "internal",
        "price",
        "photo",
        "processor",
        "quantity",
      ],
    },
  });

  const total = await Wish_item.count({
    where: { wishlistId: usersWishlist.id },
  });

  resObj.data = wishlistItems;
  resObj.numOfPages = Math.ceil(total / limit);
  resObj.currentPage = page;

  return res.status(200).json(resObj);
});

const addToWishlist = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const mobileId = parseInt(req.params.mobileId);

  if (!mobileId) {
    res.status(404);
    return next(new Error("Mobile not found!"));
  }

  const [usersWishlist, created] = await Wishlist.findOrCreate({
    where: { userId },
  });

  const [newWishItem, createdNow] = await Wish_item.findOrCreate({
    where: {
      wishlistId: usersWishlist.id,
      mobileId,
    },
    defaults: {
      wishlistId: usersWishlist.id,
      mobileId,
    },
  });

  if (createdNow) {
    return res.status(201).json(newWishItem);
  }

  return res.status(409).json({ message: "Item already in wishlist." });
});

const deleteWishItemFromList = asyncHandler(async (req, res, next) => {
  const mobileId = req.params.mobileId;

  const toDelete = await Wish_item.findOne({ where: { mobileId } });

  if (!toDelete) {
    res.status(404);
    return next(new Error("Item not found on wishlist."));
  }

  await toDelete.destroy();
  return res.status(200).json(toDelete.id);
});

module.exports = {
  addToWishlist,
  deleteWishItemFromList,
  getWishlist,
  getWishlistItemsDetails,
};
