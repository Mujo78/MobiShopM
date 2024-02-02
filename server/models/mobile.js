const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

module.exports = () => {
  const mobile = sequelize.define("Mobile", {
    mobile_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ram: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    internal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    processor: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    screen_size: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    battery: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    os: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    camera: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    BrandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  mobile.associate = (models) => {
    mobile.belongsTo(models.Brand);

    mobile.hasMany(models.Cart_item, {
      foreignKey: {
        name: "MobileId",
      },
      onDelete: "cascade",
    });
  };

  return mobile;
};
