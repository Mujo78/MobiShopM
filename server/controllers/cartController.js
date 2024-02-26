const asyncHandler = require("express-async-handler");
const { Mobile, Cart, Cart_item, sequelize } = require("../models");

const getCartItems = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const userCart = await Cart.findOne({
    where: { userId },
  });

  const cartItems = await Cart_item.findAll({
    attributes: ["quantity", "id", "total"],
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

  if (cartItems) {
    const resObj = {
      total: userCart.total,
      data: cartItems,
    };
    return res.status(200).json(resObj);
  }

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

  const quantityToUse =
    quantity > foundedMobile.quantity ? foundedMobile.quantity : quantity;

  try {
    const result = await sequelize.transaction(async (t) => {
      const [cartItem, created] = await Cart_item.findOrCreate({
        where: {
          cartId: usersCart.id,
          mobileId: foundedMobile.id,
        },
        defaults: {
          quantity: quantityToUse,
          total: parseInt(quantityToUse) * foundedMobile.price,
        },
        returning: true,
        transaction: t,
      });

      if (!created) {
        await cartItem.increment(
          {
            quantity: quantityToUse,
            total: parseInt(quantityToUse) * foundedMobile.price,
          },
          { transaction: t }
        );
      }

      await foundedMobile.decrement("quantity", {
        by:
          quantity > foundedMobile.quantity ? foundedMobile.quantity : quantity,
        transaction: t,
      });

      await usersCart.increment("total", {
        by: (parseInt(quantityToUse) * foundedMobile.price).toFixed(2),
        transaction: t,
      });

      return cartItem.id;
    });

    const resultToReturn = await Cart_item.findByPk(result, {
      attributes: ["quantity", "id", "total"],
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

const updateCartItem = asyncHandler(async (req, res, next) => {
  const itemId = req.params.itemId;
  const userId = req.user.id;
  const { quantity } = req.body;

  const usersCart = await Cart.findOne({ where: userId });

  const foundedItem = await Cart_item.findByPk(itemId);
  const foundedMobile = await Mobile.findByPk(foundedItem.mobileId);

  if (!foundedItem || !foundedMobile) {
    res.status(404);
    return next(new Error("Product not found in the cart!"));
  }

  if (parseInt(quantity) - foundedItem.quantity > foundedMobile.quantity) {
    res.status(400);
    return next(new Error("Product is not available in those quantities!"));
  }

  try {
    const result = await sequelize.transaction(async (t) => {
      let totalToDecInc;
      if (parseInt(quantity) > foundedItem.quantity) {
        totalToDecInc =
          (parseInt(quantity) - foundedItem.quantity) * foundedMobile.price;
        await foundedItem.increment("total", {
          by: totalToDecInc,
          transaction: t,
        });

        await usersCart.increment("total", {
          by: totalToDecInc,
          transaction: t,
        });

        await foundedMobile.decrement("quantity", {
          by: parseInt(quantity) - foundedItem.quantity,
          transaction: t,
        });
      } else {
        totalToDecInc =
          (foundedItem.quantity - parseInt(quantity)) * foundedMobile.price;
        await foundedItem.decrement("total", {
          by: totalToDecInc,
          transaction: t,
        });

        await usersCart.decrement("total", {
          by: totalToDecInc,
          transaction: t,
        });

        await foundedMobile.increment("quantity", {
          by: foundedItem.quantity - parseInt(quantity),
          transaction: t,
        });
      }

      totalToDecInc =
        parseInt(quantity) > foundedItem.quantity
          ? totalToDecInc
          : -totalToDecInc;

      await foundedItem.update(
        {
          quantity: parseInt(quantity),
        },
        {
          transaction: t,
        }
      );

      return totalToDecInc;
    });

    if (result) {
      return res.status(200).json({
        total: result,
      });
    }

    res.status(400);
    return next(
      new Error("Something went wrong while updating your cart quantity!")
    );
  } catch (error) {
    res.status(400);
    return next(new Error(error.message));
  }
});

const deleteFromCart = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
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

      await Cart.decrement("total", {
        by: toDelete.total,
        where: { userId },
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
  updateCartItem,
};
