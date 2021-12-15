const {Op} = require("sequelize");
const {ScheduleUser, Schedule, User} = require('../models');
const axios = require('axios');

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
                        model: User,
                        required: false,
                    }
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
        return ScheduleUser
            .findAndCountAll({
                include: [
                    {
                        model: User,
                        required: false
                    },
                    {
                        model: Schedule,
                        required: true,
                        where: {
                            run_at: {
                                [Op.lte]: new Date()
                            }
                        }
                    }
                ],
                order: [
                    ['createdAt', 'DESC'],
                ],
                where: {
                    status: "waiting",
                },
            })
            .then((scheduleusers) => {
                let data = [];
                scheduleusers.rows.forEach((su) => {

                    if (typeof data[su.schedule_id] != 'undefined') {
                        data[su.schedule_id] = {
                            phone: `${data[su.schedule_id].phone},${su.User.phone}`,
                            message: su.Schedule.message
                        }
                    } else {
                        data[su.schedule_id] = {
                            phone: su.User.phone,
                            message: su.Schedule.message
                        }
                    }
                });

                data.forEach(async (d) => {
                    const json = {
                        "dnis": d.phone,
                        "message": d.message
                    };
                    await axios.post('http://kr8tif.lawaapp.com:1338/api', json).then(function (response) {
                        console.log("Axios response", response.data);
                    }).catch(function (error) {
                        console.log(error);
                    }).then(function () {
                    });
                    console.log(json);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
};