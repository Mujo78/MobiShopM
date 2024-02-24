const asyncHandler = require("express-async-handler");
const { Mobile, Cart, Cart_item, sequelize } = require("../models");

const getCartItems = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const userCart = await Cart.findOne({
    where: { userId },
  });

  const cartItems = await Cart_item.findAll({
    attributes: ["quantity", "id"],
    where: {
      cartId: userCart.id,
    },
    include: [
      {
        model: Mobile,
        attributes: [
          "price",
          "internal",
          "mobile_name",
          "id",
          "ram",
          "photo",
          "quantity",
        ],
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

  if (foundedMobile.quantity === 0) {
    res.status(400);
    return next(new Error("Quantity for this mobile is 0."));
  }

  const [usersCart, created] = await Cart.findOrCreate({
    where: { userId },
  });

  try {
    const result = await sequelize.transaction(async (t) => {
      const [cartItem, created] = await Cart_item.findOrCreate({
        where: {
          cartId: usersCart.id,
          mobileId: foundedMobile.id,
        },
        defaults: {
          quantity:
            quantity > foundedMobile.quantity
              ? foundedMobile.quantity
              : quantity,
        },
        returning: true,
        transaction: t,
      });

      if (!created) {
        await cartItem.increment("quantity", {
          by:
            quantity > foundedMobile.quantity
              ? foundedMobile.quantity
              : quantity,
          transaction: t,
        });
      }

      await foundedMobile.decrement("quantity", {
        by:
          quantity > foundedMobile.quantity ? foundedMobile.quantity : quantity,
        transaction: t,
      });

      return cartItem.id;
    });

    const resultToReturn = await Cart_item.findByPk(result, {
      attributes: ["quantity", "id"],
      include: [
        {
          model: Mobile,
          attributes: [
            "price",
            "internal",
            "mobile_name",
            "id",
            "ram",
            "photo",
            "quantity",
          ],
        },
      ],
    });

    return res.status(201).json(resultToReturn);
  } catch (error) {
    res.status(400);
    return next(new Error(error));
  }
});

const deleteFromCart = asyncHandler(async (req, res, next) => {
  const itemId = req.params.itemId;

  const toDelete = await Cart_item.findByPk(itemId);

  if (!toDelete) {
    res.status(400);
    return next(new Error("There was an error, please try again latter!"));
  }

  try {
    await sequelize.transaction(async (t) => {
      await Mobile.increment("quantity", {
        by: toDelete.quantity,
        where: { id: toDelete.mobileId },
        transaction: t,
      });
      await toDelete.destroy({ transaction: t });
    });

    return res.status(200).json({ itemId: toDelete.id });
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
