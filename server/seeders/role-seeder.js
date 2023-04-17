'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('Roles', [
      {
        id: 1,
        name: 'Admin'
      },
      {
        id: 2,
        name: 'User'
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Roles', null, {})
  }
};
