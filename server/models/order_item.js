const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

module.exports = () => {
  const order_items = sequelize.define("Order_item", {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mobileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  });

  order_items.associate = (models) => {
    order_items.belongsTo(models.Order, {
      foreignKey: "orderId",
      onDelete: "cascade",
    });

    order_items.belongsTo(models.Mobile, {
      foreignKey: "mobileId",
      onDelete: "cascade",
    });
  };

  return order_items;
};
