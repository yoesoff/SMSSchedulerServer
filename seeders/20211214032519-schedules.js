'use strict';

const faker = require('faker');

const schedules = [...Array(3)].map((schedule) => (
    {
      run_at: new Date(),
      message: faker.git.commitMessage(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Schedules', schedules, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Schedules', null, {});
  }
};