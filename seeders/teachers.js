'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teachers', [
      {
        email: 'some11@xyz.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'some22@xyz.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'some33@xyz.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teachers', null, {});
  }
};
