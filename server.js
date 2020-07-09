'use strict';
const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const PORT = process.env.PORT || 5000;

return app.initDB()
    .then(() => {
        const application = app.initialize();
        application.listen(PORT, console.log(`Server started on port ${PORT}`));
    })
    .catch((err) => {
        console.error('ERROR: ', err);
        return process.exit(1);
    });
