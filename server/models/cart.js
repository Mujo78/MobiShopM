const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

module.exports = () => {
  const cart = sequelize.define("Cart", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  cart.associate = (models) => {
    cart.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "cascade",
    });

    cart.hasMany(models.Cart_item, {
      foreignKey: {
        name: "cartId",
      },
      onDelete: "cascade",
    });
  };
  return cart;
};
