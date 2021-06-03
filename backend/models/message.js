'use strict';
const {Sequelize, database } = require('../config/connection');

const Message = database.define('messages', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    user_id: { 
        type: Sequelize.UUID, 
        allowNull: false 
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    dislikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    modelName: 'Message',
    underscored: true,
    paranoid: false
});

module.exports = Message;