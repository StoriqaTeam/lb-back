const Message = require('../models').Message;
const User = require('../models').User;

module.exports = {
    list(req, res) {
        let limit = req.query.limit ? req.query.limit : 50;
        let offset = req.query.offset ? req.query.offset : 0;
        return Message
            .findAll({
                where: {is_active: true},
                limit: limit,
                offset: offset,
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then(messages => res.status(200).json(messages))
            .catch(error => res.status(400).json({message: error}));
    },
    async create(req, res) {
        if (req.body.content) {
            let user = await User.findById(req.body.user_id);
            return Message
                .create({
                    user_id: req.body.user_id ? req.body.user_id : 0,
                    user_name: req.body.user_name ? req.body.user_name : user.name,
                    content: req.body.content,
                    avatar: user.avatar,
                    is_active: true
                })
                .then(message => {
                    res.status(201).json({status: "ok", message});
                })
                .catch(error => res.status(400).json({
                    status: 'error',
                    message: error
                }));
        } else {
            res.status(400).json({
                status: 'error',
                message: 'Не указано сообщение'
            })
        }
    },
    update(req, res) {
        return Message
            .findById(req.params.id)
            .then(message => {
                if (!message) {
                    return res.status(404).json({
                        message: 'Message Not Found',
                    });
                }
                return message
                    .update({
                        name: req.body.name || message.name,
                        email: req.body.email || message.email
                    })
                    .then(() => res.status(200).json(message))
                    .catch((error) => res.status(400).json({message: error}));
            })
            .catch((error) => res.status(400).json({message: error}));
    },
    destroy(req, res) {
        return Message
            .findById(req.params.id)
            .then(message => {
                if (!message) {
                    return res.status(400).json({
                        message: 'Message Not Found',
                    });
                }
                return message
                    .destroy()
                    .then(() => res.status(200).json({message: 'Message deleted.'}))
                    .catch(error => res.status(400).json({message: error}));
            })
            .catch(error => res.status(400).json({message: error}));
    }
};