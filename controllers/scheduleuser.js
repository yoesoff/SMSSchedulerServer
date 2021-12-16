const {ScheduleUser, User, Schedule} = require("../models");
const {Op} = require("sequelize");

module.exports = {
    list(req, res) {
        let limit = parseInt(req.query.limit || 5);
        let offset = (parseInt(req.query.page || 1) - 1) * limit;
        let status = req.query.status || "waiting";

        let startDate = req.query.startDate || null;
        let endDate = req.query.endDate || null;

        let params = {
            limit: limit,
            offset: offset,
            include: [
                {
                    model: User,
                    required: false
                },
                {
                    model: Schedule,
                    required: true
                }
            ],
            order: [
                ['createdAt', 'DESC'],
            ],
            where:{
                status
            },
        }

        if (startDate && endDate) {
            params.include[1].where = {
                run_at: {
                    [Op.gte]: new Date(startDate),
                    [Op.lte]: new Date(endDate)
                }
            }
        }

        console.log("params", params);

        return ScheduleUser
            .findAndCountAll(params)
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