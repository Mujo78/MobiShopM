const asyncHandler = require("express-async-handler");
const { Mobile, Cart, Cart_item, sequelize } = require("../models");

const getCartItems = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const userCart = await Cart.findOne({
    where: { userId },
  });

  const cartItems = await Cart_item.findAll({
    attributes: ["quantity"],
    where: {
      cartId: userCart.id,
    },
    include: [
      {
        model: Mobile,
        attributes: ["price", "internal", "mobile_name", "id", "ram", "photo"],
      },
    ],
  });

  if (cartItems) return res.status(200).json(cartItems);

  res.status(400);
  return next(new Error("Something went wrong, please try again latter!"));
});

const addToCart = asyncHandler(async (req, res, next) => {
  const mobileId = req.params.mobileId;
  const userId = req.user.id;

  const { quantity } = req.body;

  const foundedMobile = await Mobile.findByPk(mobileId);

  if (!foundedMobile) {
    res.status(404);
    return next(new Error("Mobile not found!"));
  }

  const [usersCart, created] = await Cart.findOrCreate({
    where: { userId },
  });

  try {
    if (foundedMobile.quantity > 0) {
      const newItemQuantity =
        quantity > foundedMobile.quantity
          ? foundedMobile.quantity
          : quantity === 0
          ? 1
          : quantity;
      const newCartItem = await Cart_item.create({
        cartId: usersCart.id,
        mobileId: foundedMobile.id,
        quantity: newItemQuantity,
      });

      await foundedMobile.decrement("quantity", { by: newCartItem.quantity });

      return res.status(201).json(newCartItem);
    }

    res.status(400);
    return next(new Error("Quantity for this mobile is 0."));
  } catch (error) {
    res.status(400);
    return next(new Error(error));
  }
});

const deleteFromCart = asyncHandler(async (req, res, next) => {
  const mobileId = req.params.mobileId;

  const toDelete = await Cart_item.findOne({ where: { mobileId } });

  if (!toDelete) {
    res.status(400);
    return next(new Error("There was an error, please try again latter!"));
  }

  try {
    await sequelize.transaction(async (t) => {
      await Mobile.increment("quantity", {
        by: toDelete.quantity,
        where: { id: mobileId },
        transaction: t,
      });
      await toDelete.destroy({ transaction: t });
    });

    return res.status(200).json({ mobileID: toDelete.mobileId });
  } catch (error) {
    res.status(400);
    return next(new Error(error));
  }
});

module.exports = {
  addToCart,
  getCartItems,
  deleteFromCart,
};
