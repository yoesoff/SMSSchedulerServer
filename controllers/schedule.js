const {Op} = require("sequelize");
const ScheduleUser = require('../models').ScheduleUser;
const Schedule = require('../models').Schedule;

module.exports = {
    list(req, res) {
        let limit = parseInt(req.query.limit || 5);
        let offset = (parseInt(req.query.page || 1) - 1) * limit;
        return Schedule
            .findAndCountAll({
                limit: limit,
                offset: offset,
                include: [
                    {
                        model: ScheduleUser
                    },
                ],
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
            .then((schedules) => res.status(200).send(schedules))
            .catch((error) => {
                res.status(400).send(error);
            });
    },

    getById(req, res) {
        return Schedule
            .findByPk(req.params.id, {
                include: [{
                    model: ScheduleUser
                }],
            })
            .then((schedule) => {
                if (!schedule) {
                    return res.status(404).send({
                        message: 'Schedule Not Found',
                    });
                }
                return res.status(200).send(schedule);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        if ((new Date(req.body.run_at)) != "Invalid Date") {
            return Schedule
                .create({
                    run_at: req.body.run_at,
                    message: req.body.message,
                })
                .then((schedule) => {
                    console.log(`Prepare for ${req.body.run_at}.`);
                    res.status(201).send(schedule)
                })
                .catch((error) => res.status(400).send(error));
        } else {
            res.status(400).send();
        }
    },

    update(req, res) {
        return Schedule
            .findByPk(req.params.id)
            .then(schedule => {
                if (!schedule) {
                    return res.status(404).send({
                        message: 'Schedule Not Found',
                    });
                }
                return schedule
                    .update({
                        run_at: req.body.run_at,
                        message: req.body.message,
                    })
                    .then(() => res.status(200).send(schedule))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Schedule
            .findByPk(req.params.id)
            .then(schedule => {
                if (!schedule) {
                    return res.status(400).send({
                        message: 'Schedule Not Found',
                    });
                }
                return schedule
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    cron() {
        Schedule
            .findAndCountAll({
                where: {
                    run_at: {
                        [Op.lte]: new Date()
                    }
                },
                include: [
                    {
                        model: ScheduleUser
                    },
                ],
                order: [
                    ['createdAt', 'ASC'],
                ],
            })
            .then((schedules) => {
                schedules.rows.forEach(schedule => {
                    console.log("schedule", schedule.ScheduleUsers);
                });
            })
            .catch((error) => {

            });
    }
};