'use strict';

const faker = require('faker');

const users = [...Array(5)].map((user) => (
    {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        password: faker.internet.password(8),
        createdAt: new Date(),
        updatedAt: new Date()
    }
))

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', users, {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
