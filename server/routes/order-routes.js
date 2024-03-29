const express = require("express");
const { adminMiddleware } = require("../middlewares/admin-check");
const router = express.Router();

const { authMiddleware } = require("../middlewares/auth-middleware");
const {
  Persons,
  User,
  Order,
  Order_item,
  Cart,
  Cart_item,
  Mobile,
} = require("../models");
const {
  buyNow,
  getOrders,
  makeOrderShipped,
  cancelOrder,
  getOrderItem,
  getMyOrders,
  orderFromCart,
} = require("../controllers/orderController");
const {
  buyNowValidator,
  buyCartItemValidator,
} = require("../validators/order");
const {
  errorValidationMiddleware,
} = require("../middlewares/errorValidationMiddleware");

router.post(
  "/buy-now/:mobileId",
  authMiddleware,
  buyNowValidator,
  errorValidationMiddleware,
  buyNow
);

router.post(
  "/buy-cart-item/:itemId",
  authMiddleware,
  buyCartItemValidator,
  errorValidationMiddleware,
  orderFromCart
);

router.get("/orders", adminMiddleware, getOrders);
router.get("/my-orders", authMiddleware, getMyOrders);

router.patch("/order/:orderId", adminMiddleware, makeOrderShipped);
router.put("/cancel-order/:orderId", adminMiddleware, cancelOrder);
router.get("/order-item/:orderId", authMiddleware, getOrderItem);

/*
router.get("/order-items/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;

    const OrdersUser = await Order.findAll({ where: { UserId: id } });
    if (OrdersUser) {
      const allIds = OrdersUser.map((n) => n.id);

      const OrderItems = await Order_item.findAll({
        where: { OrderId: allIds },
        include: [Mobile, Order],
      });
      if (OrderItems !== null) {
        const AllInfo = OrderItems.map((m) => {
          const { Mobile, Order, id, createdAt, updatedAt } = m;
          const { order_status } = Order;
          const {
            mobile_name,
            ram,
            internal,
            camera,
            processor,
            os,
            price,
            screen_size,
            battery,
            photo,
          } = Mobile;
          return {
            id,
            screen_size,
            mobile_name,
            order_status,
            ram,
            internal,
            camera,
            processor,
            os,
            price,
            battery,
            createdAt,
            updatedAt,
            photo,
          };
        });
        return res.status(200).json(AllInfo);
      }
    }
  } catch (error) {
    return res.status(401).json(error);
  }
});
*/

module.exports = router;
