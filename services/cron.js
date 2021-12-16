const {Op} = require("sequelize");
const {ScheduleUser, Schedule, User} = require('../models');
const axios = require('axios');

module.exports = {
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
                            ids: data[su.schedule_id].ids.concat([su.id]),
                            phone: `${data[su.schedule_id].phone},${su.User.phone}`,
                            message: su.Schedule.message
                        }
                    } else {
                        data[su.schedule_id] = {
                            ids: [su.id],
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

                        // Update status waiting to pending
                        ScheduleUser.update(
                            {status: "pending"},
                            {
                                where: {
                                    id: {
                                        [Op.in]: d.ids
                                    }
                                }
                            }
                        ).then((result) => {
                            console.log("ScheduleUser updated to pending", result);
                        });
                    }).
                    catch(function (error) {
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
}