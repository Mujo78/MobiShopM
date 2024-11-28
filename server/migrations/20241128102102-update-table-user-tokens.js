"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("UserTokens", "expiresAt", {
      type: Sequelize.DATE,
    });

    await queryInterface.changeColumn("UserTokens", "tokenType", {
      type: Sequelize.ENUM("Reset Password", "Verification"),
      allowNull: false,
    });

    await queryInterface.addColumn("Users", "isVerified", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("UserTokens", "expiresAt");

    await queryInterface.changeColumn("UserTokens", "tokenType", {
      type: Sequelize.ENUM("Reset Password"),
      allowNull: false,
    });

    await queryInterface.removeColumn("Users", "isVerified");
  },
};
