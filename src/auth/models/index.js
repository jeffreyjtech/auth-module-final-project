'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const userModel = require('./users-model');

const HEROKU_POSTGRESQL_BLUE_URL = process.env.HEROKU_POSTGRESQL_BLUE_URL || 'sqlite:.auth';

const sequelizeConfig = {
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  },
};

const authSequelize = new Sequelize(HEROKU_POSTGRESQL_BLUE_URL, sequelizeConfig);

module.exports = {
  authDb: authSequelize,
  users: userModel(authSequelize, DataTypes),
};
