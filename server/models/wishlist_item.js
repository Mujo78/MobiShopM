const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

module.exports = () => {
  const wish_items = sequelize.define("Wish_item", {
    WishlistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    MobileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  wish_items.associate = (models) => {
    wish_items.belongsTo(models.Wishlist);

    wish_items.belongsTo(models.Mobile, {
      onDelete: "cascade",
    });
  };
  return wish_items;
};
