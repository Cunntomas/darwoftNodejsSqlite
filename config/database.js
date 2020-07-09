const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

module.exports = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});
