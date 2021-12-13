const ScheduleUser = require('../models').ScheduleUser;

module.exports = {
    list(req, res) {
        return ScheduleUser
            .findAll({
                include: [],
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
            .then((scheduleusers) => res.status(200).send(scheduleusers))
            .catch((error) => {
                res.status(400).send(error);
            });
    },

    getById(req, res) {
        return ScheduleUser
            .findByPk(req.params.id)
            .then((schedule) => {
                if (!schedule) {
                    return res.status(404).send({
                        message: 'ScheduleUser Not Found',
                    });
                }
                return res.status(200).send(schedule);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return ScheduleUser
            .create({
                run_at: req.body.run_at,
                message: req.body.message,
            })
            .then((schedule) => res.status(201).send(schedule))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return ScheduleUser
            .findByPk(req.params.id)
            .then(schedule => {
                if (!schedule) {
                    return res.status(404).send({
                        message: 'ScheduleUser Not Found',
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
        return ScheduleUser
            .findByPk(req.params.id)
            .then(schedule => {
                if (!schedule) {
                    return res.status(400).send({
                        message: 'ScheduleUser Not Found',
                    });
                }
                return schedule
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};