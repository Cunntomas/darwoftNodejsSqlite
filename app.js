'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./lib/routes');


function initDB() {
    // Database
    const db = require('./config/database');

    // Test DB
    return db.authenticate()
        .then(() => console.log('Database connected...'))
        .catch((err) => console.log('Error: ' + err));
}

function initialize() {
    const app = express();

    // body-parser
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    //Use routes middlewares
    Object.keys(routes).forEach((key) => {
        app.use(`/api/${key}`, routes[key]);
    });

    return app;
}

module.exports = {
    initDB,
    initialize
};
