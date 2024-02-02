const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

module.exports = () => {
  const brand = sequelize.define("Brand", {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });

  brand.associate = (models) => {
    brand.hasMany(models.Mobile, {
      onDelete: "cascade",
      foreignKey: {
        name: "BrandId",
      },
    });
  };

  return brand;
};
