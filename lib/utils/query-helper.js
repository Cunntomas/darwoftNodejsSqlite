'use strict';
const {Op} = require('sequelize');

function birthdayBeetweenRange(dateRange) {
    let query = {
        [Op.between]: dateRange
    };
    return query;
}

function birthdayBeforeAfterDate(date) {
    let query = {
        [Op.or]: {
            [Op.gt]: date,
            [Op.lt]: date
        }
    };
    return query;
}

function stringSearch(string) {
    let query = {
        [Op.or]: {
            name : {
                [Op.like]: `%${string}%`
            },
            lastname : {
                [Op.like]: `%${string}%`
            }
        }
    };
    return query;
}

function usersQuery(params = null) {
    if(!params) {
        return {};
    }
    let query = {
        where:{}
    };
    if(params.birthdayBeetweenRange) {
        let dateRange = params.birthdayBeetweenRange.split(',');
        query.where.birthday = {...birthdayBeetweenRange(dateRange)};
    }
    if(params.birthdayBeforeAfterDate) {
        query.where.birthday = {...birthdayBeforeAfterDate(params.birthdayBeforeAfterDate)};
    }
    if(params.stringSearch) {
        query.where = {...stringSearch(params.stringSearch)};
    }
    return query;
}


module.exports = {
    usersQuery
};
