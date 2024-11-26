"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

module.exports = () => {
  const userTokens = sequelize.define(
    "UserToken",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tokenType: {
        type: DataTypes.ENUM("Reset Password"),
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  console.log(userTokens);

  return userTokens;
};