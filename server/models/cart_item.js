const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

module.exports = () => {
  const cart_items = sequelize.define("Cart_item", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DOUBLE,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mobileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  cart_items.associate = (models) => {
    cart_items.belongsTo(models.Cart, {
      foreignKey: "cartId",
      onDelete: "cascade",
    });

    cart_items.belongsTo(models.Mobile, {
      foreignKey: "mobileId",
      onDelete: "cascade",
    });
  };
  return cart_items;
};
