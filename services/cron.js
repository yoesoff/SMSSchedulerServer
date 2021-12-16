const {Op} = require("sequelize");
const {ScheduleUser, Schedule, User} = require('../models');
const axios = require('axios');

module.exports = {
    title: "Cron service running",
    url: 'http://kr8tif.lawaapp.com:1338/api',
    runSchedules() {
        console.log(this.title);
        const params = {
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
        }

        return ScheduleUser
            .findAndCountAll(params)
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

                    if (!d.phone || d.phone.length <= 0) {
                        console.log("Nothing todo, empty phone number");
                    } else {
                        let json = {
                            "dnis": d.phone,
                            "message_ids": [],
                            "message": d.message
                        };

                        await axios.post(this.url, json).then(function (response) {

                            let arrData = [];

                            // response is not consistence, for multiuple dnis [] and  {} for single dnis
                            if (Array.isArray(response.data)) {
                                arrData = response.data;
                            } else {
                                // object is empty?
                                if (Object.keys(response.data).length === 0 ) {
                                    console.log("hmhm... somehow response is empty.");
                                } else {
                                    arrData.push(response.data);
                                }
                            }

                            arrData.forEach((dt, i) => {
                                json.message_ids = json.message_ids.concat([dt.message_id])

                                ScheduleUser.update(
                                    {status: "pending", message_id: dt.message_id},
                                    {
                                        where: {
                                            id: d.ids[i]
                                        }
                                    }
                                ).then((result) => {
                                    if (result > 0) {
                                        console.info(`ScheduleUser ${d.ids[i]} updated; message_id: ${dt.message_id}, status: pending`);
                                    } else {
                                        console.info("No update happened!")
                                    }
                                });
                            });

                        }).catch(function (error) {
                            console.log(error);
                        }).then(function () {
                        });
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },
    runCheckSMSStatus() {
        const params = {
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
                status: {
                    [Op.notIn]: ["DELIVRD", "UNDELIV", "UNKNOWN"]
                },
            },
        };

        ScheduleUser.findAndCountAll(params)
        .then((scheduleusers) => {
            scheduleusers.rows.forEach((su) => {
                if (su.message_id.length > 0) {
                    axios.get(this.url + `?messageId=${su.message_id}` ).then(response => {
                        console.log(`Update status for message ${su.message_id}`, response.data.status);
                        su.status = response.data.status
                        ScheduleUser.update(
                            {status: response.data.status},
                            {
                                where: {
                                    id: su.id
                                }
                            }
                        )
                    }).catch(function (error) {
                        console.log(error);
                    }).then(function () {
                    });
                } else {
                    console.log("Message ID is not available yet!")
                }
            });
        });
    }
}