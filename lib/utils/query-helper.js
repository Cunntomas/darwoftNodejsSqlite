'use strict';
const {Op} = require('sequelize');

function birthdayBeetweenRange(dateRange) {
    let query = {
        birthday: {
            [Op.between]: dateRange
        }
    };
    return query;
}

function birthdayBeforeAfterDate(date) {
    let query = {
        birthday: {
            [Op.or]: {
                [Op.gt]: date,
                [Op.lt]: date
            }
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

// This function manages incoming data, sends it to the proper function and processes resulting querys into a single one
function usersQuery(params = null) {
    if(!params) {
        return {};
    }
    let querys = [];
    if(params.birthdayBeetweenRange) {
        let dateRange = params.birthdayBeetweenRange.split(',');
        querys.push(birthdayBeetweenRange(dateRange));
    }
    if(params.birthdayBeforeAfterDate) {
        querys.push(birthdayBeetweenRange(birthdayBeforeAfterDate(params.birthdayBeforeAfterDate)));
    }
    if(params.stringSearch) {
        querys.push(stringSearch(params.stringSearch));
    }
    let query = {};

    //if there are more than one querys adds a AND operator and joins all querys
    if(querys.length > 1) {
        let whereQuery = {};
        querys.forEach((q) => {
            whereQuery = Object.assign(whereQuery, q);
        });
        query.where = {
            [Op.and]: whereQuery
        };
        return query;
    }

    //if there is only 1 query then the AND operator is not needed
    query.where = querys[0];
    return query;
}


module.exports = {
    usersQuery
};
