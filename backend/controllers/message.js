const User = require('../models/user');
const Message = require('../models/message');

Message.belongsTo(User, {foreignKey: 'user_id'});

const jwt = require('jsonwebtoken');

exports.createMessage = (req, res) => {
    const body = req.body;
    Message.create({
        ...body
    }).then(
        () => res.status(200).json({ message: "Message created !"})
    ).catch(
        error => res.status(400).json({error})
    );
};

exports.getOneMessage = (req, res) => {
    message.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User
            }
        ]
    })
    .then((message) => res.status(200).json(message))
    .catch(error => res.status(404).json({error: error}));
};

exports.getAllMessages = (req, res) => {
    Message.findAll({
        include: [
            {
                model: User
            }
        ]
    }).then(
        (messages) => res.status(200).json(messages)
    ).catch(
        (error) => res.status(400).json({ error: error })
    );
};

exports.modifyMessage = async (req, res) => {
    const id = req.body.user_id;
    const post_id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.user_id;

    if(id === userId) {
        Message.findOne({ where: {id: post_id },
            include: [
                {
                    model: User
                }
            ]})
        .then(message => {
            console.log(...req.body);
            message.update( {...req.body, id : post_id})
            .then(() => res.status(200).json({ message: 'Votre message a bien été modifié !'}))
            .catch(error => res.status(400).json({error}));
        }).catch(
            error => res.status(500).json({ error })
        )
    } else {
        return res.status(401).json({ error: "Vous n'avez pas l'autorisation nécessaire !" })
    }
};

exports.deleteMessage = async (req, res) => {
    await Message.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message : "Message deleted !"}))
    .catch(error => res.status(400).json({ error }));
};