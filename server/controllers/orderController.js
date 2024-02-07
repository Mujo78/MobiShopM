const asyncHandler = require("express-async-handler");
const { Order, Order_item, Mobile } = require("../models");
const { Op } = require("sequelize");

const buyNow = asyncHandler(async (req, res) => {
  const mobileId = req.params.mobileId;
  const user = req.user;

  const { payment_info, quantity } = req.body;

  return res.status(200).json(user);
});

const orderFromCart = asyncHandler(async (req, res, next) => {
  const cartId = req.params.cartId;
  const user = req.user;

  const { payment_info } = req.body;
});

const getOrders = asyncHandler(async (req, res, next) => {
  const allOrders = await Order.findAll({
    where: {
      ORDER_STATUS: "Pending",
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
  getOrders,
  makeOrderShipped,
  cancelOrder,
  getOrderItem,
  getMyOrders,
};
