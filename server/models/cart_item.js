const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

module.exports = () => {
  const cart_items = sequelize.define("Cart_item", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    MobileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  cart_items.associate = (models) => {
    cart_items.belongsTo(models.Cart);

    cart_items.belongsTo(models.Mobile, {
      onDelete: "cascade",
    });
  };
  return cart_items;
};
