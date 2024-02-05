const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

module.exports = () => {
  const wish_items = sequelize.define("Wish_item", {
    wishlistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mobileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  wish_items.associate = (models) => {
    wish_items.belongsTo(models.Wishlist, {
      foreignKey: "wishlistId",
      onDelete: "cascade",
    });

    wish_items.belongsTo(models.Mobile, {
      foreignKey: "mobileId",
      onDelete: "cascade",
    });
  };
  return wish_items;
};
