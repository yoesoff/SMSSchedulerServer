const ScheduleUser = require('../models').ScheduleUser;
const User = require('../models').User;

module.exports = {
    list(req, res) {
        let limit = parseInt(req.query.limit || 5);
        let offset = (parseInt(req.query.page || 1) - 1) * limit;
        return User
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
            .then((users) => res.status(200).send(users))
            .catch((error) => {
                res.status(400).send(error);
            });
    },

    getById(req, res) {
        return User
            .findByPk(req.params.id, {
                include: [{
                    model: ScheduleUser,
                }],
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return User
            .create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return User
            .findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .update({
                        name: req.body.name || user.name,
                        email: req.body.email || user.email,
                        phone: req.body.phone || user.phone,
                        password: req.body.password || user.password // TODO: Encrypt later
                    })
                    .then(() => res.status(200).send(user))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return User
            .findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(400).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};