'use strict';

const faker = require("faker");
const Schedule = require('../models').Schedule;
const User = require('../models').User;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let scheduleusers = [];
        await User.findAll({
            include: [],
            order: [
                ['createdAt', 'DESC'],
            ],
        }).then(async (users) => {
            await Schedule.findAll({
                include: [],
                order: [
                    ['createdAt', 'DESC'],
                ],
            }).then((schedules) => {
                schedules.map((schedule) => {
                    users.map((user) => {
                        scheduleusers.push({
                            schedule_id: schedule.id,
                            user_id: user.id,
                            status: 'waiting',
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                    })
                });
            });
        });
        return queryInterface.bulkInsert('ScheduleUsers', scheduleusers, {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('ScheduleUsers', null, {});
    }
};
