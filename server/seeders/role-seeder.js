"use strict";
const { Role } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const adminRoles = await Role.findAll();

    if (adminRoles.length === 0) {
      await queryInterface.bulkInsert("Roles", [
        {
          id: 1,
          name: "Admin",
        },
        {
          id: 2,
          name: "User",
        },
      ]);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
