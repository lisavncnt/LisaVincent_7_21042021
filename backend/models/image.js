'use strict';
const {Sequelize, database } = require('../config/connection');

const Img = database.define('images',{
    id: {
        type:Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    image_url: {
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
},{
    Sequelize,
    modelName: 'Img',
    underscored: true,
    paranoid: false,
});

module.exports = Img;