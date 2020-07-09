'use strict';
const express = require('express');
const router = express.Router();
// const db = require('../config/database');
const User = require('../models/user');
const moment = require('moment');
const {
    validateUserData,
    sanitizeUsersUpdateData
} = require('../utils/middleware/validate-user-request');
const {usersQuery} = require('../utils/query-helper');

function validateDateFormat(date) {
    let isValid = moment(date, 'YYYY/MM/DD').isValid();
    return isValid;
}

router.post('/', validateUserData, (req, res) => {
    let userData = req.body;
    if(!validateDateFormat(userData.birthday)) {
        return res.status(400).json({
            error: 'wrong_birthday_format',
            message: 'birthday format must be YYYY/MM/DD'
        });
    }
    return User.create({
        name: userData.name,
        lastname: userData.lastname,
        birthday: userData.birthday,
        dni: userData.dni
    })
        .then((user) => {
            res.json({
                user
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                error: 'internal_error',
                message: 'an error has ocurred'
            });
        });
});

router.get('/', (req, res) => {
    let query = usersQuery(req.query);
    return User.findAll(query)
        .then((users) => {
            res.json({
                users
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                error: 'internal_error',
                message: 'an error has ocurred'
            });
        });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    return User.findAll({userId: id})
        .then((users) => {
            res.json({
                users
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                error: 'internal_error',
                message: 'an error has ocurred'
            });
        });
});

router.put('/', sanitizeUsersUpdateData, (req, res) => {
    let query = usersQuery(req.query);
    let updateData = req.body;
    return User.update(updateData, query)
        .then((rows) => {
            let message = 'update succesfull';
            if(rows == 0) {
                message = 'no user was updated';
            }
            res.json({
                message,
                usersUpdated: rows
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                error: 'internal_error',
                message: 'an error has ocurred'
            });
        });
});

router.put('/:id', sanitizeUsersUpdateData, (req, res) => {
    let id = req.params.id;
    let query = {
        where: {
            userId: id
        }
    };
    let updateData = req.body;
    return User.update(updateData, query)
        .then((rows) => {
            let message = 'update succesfull';
            if(rows == 0) {
                message = 'no user was updated';
            }
            res.json({
                message,
                usersUpdated: rows
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                error: 'internal_error',
                message: 'an error has ocurred'
            });
        });
});

router.delete('/', (req, res) => {
    let query = usersQuery(req.query);
    return User.destroy(query)
        .then((rows) => {
            let message = 'update succesfull';
            if(rows == 0) {
                message = 'no user was updated';
            }
            res.json({
                message,
                usersUpdated: rows
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                error: 'internal_error',
                message: 'an error has ocurred'
            });
        });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let query = {
        where: {
            userId: id
        }
    };
    return User.destroy(query)
        .then((rows) => {
            let message = 'update succesfull';
            if(rows == 0) {
                message = 'no user was updated';
            }
            res.json({
                message,
                usersUpdated: rows
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                error: 'internal_error',
                message: 'an error has ocurred'
            });
        });
});

module.exports = router;
