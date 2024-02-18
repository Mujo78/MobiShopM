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

  if (wishlistItems) return res.status(200).json(wishlistItems);

  res.status(400);
  return next(new Error("Something went wrong, please try again latter!"));
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

  if (wishlistItems) {
    resObj.data = wishlistItems;
    resObj.numOfPages = Math.ceil(total / limit);
    resObj.currentPage = page;

    return res.status(200).json(resObj);
  }

  res.status(400);
  return next(new Error("Something went wrong, please try again latter!"));
});

const addToWishlist = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const mobileId = parseInt(req.params.mobileId);

  if (!mobileId) {
    res.status(400);
    return next(new Error("Mobile not found!"));
  }

  const [usersWishlist, created] = await Wishlist.findOrCreate({
    where: { userId },
  });

  try {
    const [newWishItem, created] = await Wish_item.findOrCreate({
      where: {
        wishlistId: usersWishlist.id,
        mobileId,
      },
      defaults: {
        wishlistId: usersWishlist.id,
        mobileId,
      },
    });

    if (created) {
      return res.status(201).json(newWishItem);
    }

    return res.status(200).json({ message: "Item already in wishlist." });
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
  getWishlistItemsDetails,
};
