const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

module.exports = () => {
  const order = sequelize.define("Order", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_date: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    total_cost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    shipping_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_info: {
      type: DataTypes.ENUM("Card", "Delivery"),
      allowNull: false,
    },
    order_status: {
      type: DataTypes.ENUM("Shipped", "Pending", "Canceled"),
      defaultValue: "Pending",
      allowNull: false,
    },
  });

  order.associate = (models) => {
    order.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "cascade",
    });

    order.hasMany(models.Order_item, {
      foreignKey: {
        name: "orderId",
      },
      onDelete: "cascade",
    });
  };

  return order;
};
