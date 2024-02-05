const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

module.exports = () => {
  const wishlist = sequelize.define("Wishlist", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  wishlist.associate = (models) => {
    wishlist.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "cascade",
    });

    wishlist.hasMany(models.Wish_item, {
      foreignKey: {
        name: "wishlistId",
      },
      onDelete: "cascade",
    });
  };
  return wishlist;
};
