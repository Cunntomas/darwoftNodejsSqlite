'use strict';
const moment = require('moment');
const userValidModificationFields = ['name', 'lastname', 'birthday', 'dni'];


function validateUserData(req, res, next) {
    if (!req.body.name || !req.body.birthday || !req.body.dni || !req.body.lastname) {
        return res.status(400).json({
            error: 'missing params',
            code: 'missing_params', status: 'error'
        });
    }
    return next();
}

function sanitizeUsersUpdateData(req, res, next) {
    if (!req.body.name && !req.body.birthday && !req.body.dni && !req.body.lastname) {
        return res.status(400).json({
            error: 'There must be at least one valid param',
            code: 'missing_params', status: 'error'
        });
    }
    Object.keys(req.body).forEach((field) => {
        if(userValidModificationFields.indexOf(field) < 0) {
            Reflect.deleteProperty(req.body[field]);
        }
    });
    return next();
}

function validateDateFormat(req, res, next) {
    let isValid = moment(req.body.birthday, 'YYYY/MM/DD', true).isValid();
    if(!isValid) {
        return res.status(400).json({
            error: 'wrong_birthday_format',
            message: 'birthday format must be YYYY/MM/DD'
        });
    }
    return next();
}

function validateRequiredQuery(req, res, next) {
    if(!req.query) {
        return res.status(400).json({
            error: 'delete_query_required',
            message: 'Delete method requires a query'
        });
    }
    return next();
}

module.exports = {
    validateUserData,
    sanitizeUsersUpdateData,
    validateDateFormat,
    validateRequiredQuery
};
