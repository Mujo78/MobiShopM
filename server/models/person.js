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
      defaultValue: "",
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: false,
      defaultValue: "Other",
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
