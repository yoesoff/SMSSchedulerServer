const {ScheduleUser, User, Schedule} = require("../models");

module.exports = {
    list(req, res) {
        let limit = parseInt(req.query.limit || 5);
        let offset = (parseInt(req.query.page || 1) - 1) * limit;
        return ScheduleUser
            .findAndCountAll({
                limit: limit,
                offset: offset,
                include: [
                    {
                        model: User,
                        required: false
                    },
                    {
                        model: Schedule,
                        required: false
                    }
                ],
                order: [
                    ['createdAt', 'DESC'],
                ],
                where:{
                    status:"waiting"
                },
            })
            .then((scheduleusers) => res.status(200).send(scheduleusers))
            .catch((error) => {
                res.status(400).send(error);
            });
    },

    getById(req, res) {
        return ScheduleUser
            .findByPk(req.params.id, {
                include: [{
                    model: Schedule
                },{
                    model: User
                }],
            })
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
        res.status(400).send("error");
        return;
    },

    update(req, res) {
        res.status(400).send("error");
        return;
    },

    delete(req, res) {
        res.status(400).send("error");
        return;
    },
};