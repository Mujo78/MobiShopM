const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

module.exports = () => {
  const comments = sequelize.define("Comment", {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });

  return comments;
};
