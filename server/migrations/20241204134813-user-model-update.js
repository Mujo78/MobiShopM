"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("People", "phone_number", {
      type: Sequelize.STRING(12),
      allowNull: false,
      defaultValue: "",
    });

    await queryInterface.changeColumn("People", "address", {
      type: Sequelize.STRING(100),
      allowNull: false,
      defaultValue: "",
    });

    await queryInterface.changeColumn("People", "city", {
      type: Sequelize.STRING(100),
      allowNull: false,
      defaultValue: "",
    });

    await queryInterface.changeColumn("People", "gender", {
      type: Sequelize.ENUM("Male", "Female", "Other"),
      allowNull: false,
      defaultValue: "Other",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("People", "phone_number", {
      type: Sequelize.STRING(12),
      allowNull: false,
    });

    await queryInterface.changeColumn("People", "address", {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    await queryInterface.changeColumn("People", "city", {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    await queryInterface.changeColumn("People", "gender", {
      type: Sequelize.ENUM("Male", "Female", "Other"),
      allowNull: false,
    });
  },
};
