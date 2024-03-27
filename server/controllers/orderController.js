const asyncHandler = require("express-async-handler");
const {
  Order,
  Order_item,
  Mobile,
  Person,
  sequelize,
  Cart,
  Cart_item,
} = require("../models");
const { Op } = require("sequelize");

const buyNow = asyncHandler(async (req, res, next) => {
  const mobileId = req.params.mobileId;
  const user = req.user;

  const { payment_info, quantity } = req.body;

  const foundedMobile = await Mobile.findByPk(mobileId);

  if (!foundedMobile) {
    res.status(404);
    return next(new Error("Mobile is not available!"));
  }

  const person = await Person.findByPk(user.personId);

  if (!person) {
    res.status(404);
    return next(new Error("There was an error, please try again later!"));
  }

  try {
    const result = await sequelize.transaction(async (t) => {
      const total_cost = (parseInt(quantity) * foundedMobile.price).toFixed(2);

      await foundedMobile.decrement(
        {
          quantity,
        },
        {
          transaction: t,
        }
      );

      const newOrder = await Order.create(
        {
          userId: user.id,
          total_cost,
          shipping_address: `${person.city}, ${person.address}`,
          payment_info,
        },
        {
          transaction: t,
        }
      );

      const newOrderItem = await Order_item.create(
        {
          orderId: newOrder.id,
          mobileId: foundedMobile.id,
          quantity,
          price: total_cost,
        },
        { transaction: t }
      );

      return newOrderItem;
    });

    if (result) return res.status(201).json(result);

    res.status(404);
    return next(new Error("There was an error, please try again later!"));
  } catch (error) {
    res.status(404);
    return next(new Error(error.message));
  }
});

const orderFromCart = asyncHandler(async (req, res, next) => {
  const cartItemId = req.params.itemId;
  const user = req.user;

  const { payment_info } = req.body;

  const person = await Person.findByPk(user.personId);

  const cartItem = await Cart_item.findByPk(cartItemId);

  if (!cartItem) {
    res.status(404);
    return next(new Error("Product not found in the cart!"));
  }

  try {
    const result = await sequelize.transaction(async (t) => {
      await Cart.decrement(
        {
          total: cartItem.total,
        },
        {
          where: {
            userId: user.id,
          },
          transaction: t,
        }
      );

      const newOrder = await Order.create(
        {
          userId: user.id,
          total_cost: cartItem.total,
          shipping_address: `${person.city}, ${person.address}`,
          payment_info,
        },
        {
          transaction: t,
        }
      );

      await Order_item.create(
        {
          orderId: newOrder.id,
          mobileId: cartItem.mobileId,
          quantity: cartItem.quantity,
          price: cartItem.total,
        },
        {
          transaction: t,
        }
      );

      await cartItem.destroy({
        transaction: t,
      });

      return cartItem;
    });

    if (result) return res.status(201).json(result);

    res.status(404);
    return next(new Error("There was an error, please try again later!"));
  } catch (error) {
    res.status(404);
    return next(new Error(error.message));
  }
});

const orderAllFromCart = asyncHandler(async (req, res, next) => {
  const cartId = req.params.cartId;
  const user = req.user;

  const usersCart = await Cart.findByPk(cartId);

  if (!usersCart) {
    res.status(404);
    return next(new Error("Cart not found!"));
  }

  try {
  } catch (error) {}

  const { payment_info } = req.body;
});

const getOrders = asyncHandler(async (req, res, next) => {
  const allOrders = await Order.findAll({
    where: {
      order_status: "Pending",
    },
  });

  if (allOrders) return res.status(200).json(allOrders);

  res.status(400);
  return next(new Error("Something went wrong, please try again latter!"));
});

const makeOrderShipped = asyncHandler(async (req, res, next) => {
  const orderId = req.params.orderId;
  const toUpdate = await Order.findByPk(orderId);

  if (!toUpdate) {
    res.status(404);
    return next(new Error("Order not found!"));
  }

  try {
    await toUpdate.update({ order_status: "Shipped" });

    return res.status(200).json(toUpdate);
  } catch (error) {
    res.status(400);
    return next(new Error(error));
  }
});

const cancelOrder = asyncHandler(async (req, res, next) => {
  const orderId = req.params.orderId;
  const userId = req.user.id;

  const orderToUpdate = await Order.findOne({
    id: orderId,
    userId,
    order_status: {
      [Op.ne]: "Shipped",
    },
  });

  if (!orderToUpdate) {
    res.status(404);
    return next(new Error("Order not found!"));
  }

  try {
    await orderToUpdate.update({ order_status: "Canceled" });

    return res.status(200).json(orderToUpdate);
  } catch (error) {
    res.status(400);
    return next(new Error(error));
  }
});

const getOrderItem = asyncHandler(async (req, res, next) => {
  const orderId = req.params.orderId;

  const orderItem = await Order_item.findByPk(orderId, {
    include: [
      {
        model: Mobile,
        attributes: ["mobile_name"],
      },
      {
        model: Order,
        attributes: {
          exclude: ["id", "userId", "createdAt", "updatedAt"],
        },
      },
    ],
    attributes: {
      include: ["quantity"],
    },
  });

  if (!orderItem) {
    res.status(404);
    return next(new Error("Item not found!"));
  }

  return res.status(200).json(orderItem);
});

const getMyOrders = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const myOrders = await Order.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });

  if (myOrders) return res.status(200).json(myOrders);

  res.status(400);
  return next(new Error("Something went wrong, please try again latter!"));
});

module.exports = {
  buyNow,
  orderFromCart,
  getOrders,
  makeOrderShipped,
  cancelOrder,
  getOrderItem,
  getMyOrders,
};
