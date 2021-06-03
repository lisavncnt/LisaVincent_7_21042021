'use strict';
const {Sequelize, database} = require('../config/connection');

const User = database.define('users', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    pseudo: {
        type: Sequelize.STRING,
        required: true,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        required: true,
        unique: true
    },
    password: { 
        type: Sequelize.STRING, 
        required: true 
    },
    image_url: { 
        type: Sequelize.STRING, 
        defaultValue: "https://media.istockphoto.com/vectors/woman-default-avatar-icon-vector-isolated-on-white-vector-id1310731736?b=1&k=6&m=1310731736&s=170667a&w=0&h=z_vIF9VJO9DGW_45isCqfmVFL0FOZUbIxZWKfOucwtU=", 
    },
    is_admin: {
        type:Sequelize.BOOLEAN,
        defaultValue:0
    },
    totalLiked: {
        type: Sequelize.INTEGER,
        required: false,
        allowNull: true,
        defaultValue: 0
    },
}, {
    Sequelize,
    modelName: 'User',
    underscored: true,
    paranoid: false
});


module.exports = User;