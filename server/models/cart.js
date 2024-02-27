const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

module.exports = () => {
  const cart = sequelize.define("Cart", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      get() {
        return parseFloat(this.getDataValue("total")).toFixed(2);
      },
      set(value) {
        this.setDataValue("total", parseFloat(value).toFixed(2));
      },
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
