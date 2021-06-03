'use strict';
const {Sequelize, database } = require('../config/connection');

const Comment = database.define('comments', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    dislikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    usersLiked: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    usersDisliked: {
        type: Sequelize.JSON,
        allowNull: true,
    },
}, {
    Sequelize,
    modelName: 'Comment',
    underscored: true,
    paranoid: false
});

module.exports = Comment;