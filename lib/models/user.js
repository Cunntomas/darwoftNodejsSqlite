'use strict';
const Sequelize = require('sequelize');
const db = require('../../config/database');

const User = db.define('user', {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    birthday: {
        type: Sequelize.DATEONLY
    },
    dni: {
        type: Sequelize.STRING
    }
});

User.sync().then(() => {
    console.log('table created');
});
module.exports = User;
