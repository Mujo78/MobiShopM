const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

module.exports = () => {
  const person = sequelize.define("Person", {
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  });

  person.associate = (models) => {
    person.hasOne(models.User, {
      foreignKey: {
        name: "personId",
      },
      onDelete: "cascade",
    });
  };
  return person;
};
