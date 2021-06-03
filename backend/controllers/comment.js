const User = require('../models/user');
const Message = require('../models/message');
const Img = require('../models/image');
const Comment = require('../models/comment');

Comment.belongsTo(User, {foreignKey: 'user_id'});
Comment.belongsTo(Message, {foreignKey: 'msg_id'});
Comment.belongsTo(Img, {foreignKey: 'img_id'});

exports.createComment = (req, res) => {
    const body = req.body;
        Comment.create({
            ...body
        })
        .then(() => res.status(200).json({ message: "Comment created !"}))
        .catch(error => res.status(400).json({error}));
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll({})
    .then((comments) => res.status(200).json(comments))
    .catch(error => res.status(400).json({error}));
};

exports.getOneComment = (req, res, next) => {
    Comment.findOne({
        where: {
            id: req.params.id
        }
    })
    .then((comment) => res.status(200).json(comment))
    .catch(error => res.status(404).json({ error: error }));
};


exports.modifyComment = async (req, res, next) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(
        await Comment.create({
            content: req.body.content
        })
        .then((comment) => res.status(200).json(comment))
        .catch(error => res.status(400).json({ error: error }))
    )
    .catch(
        error => res.status(500).json({ error: error })
    );
};

exports.deleteComment = async (req, res, next) => {
    await Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: 'Comment deleted !'}))
    .catch(error => res.status(400).json({error}));
};