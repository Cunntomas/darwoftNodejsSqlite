'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./lib/routes');

// Database
const db = require('./config/database');

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch((err) => console.log('Error: ' + err));

const app = express();

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Use routes middlewares
Object.keys(routes).forEach((key) => {
    app.use(`/api/${key}`, routes[key]);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
