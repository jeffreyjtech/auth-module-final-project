'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const userModel = require('./users-model');

const HEROKU_POSTGRESQL_MAROON_URL = process.env.HEROKU_POSTGRESQL_MAROON_URL || 'sqlite:.auth';

const authSequelize = new Sequelize(HEROKU_POSTGRESQL_MAROON_URL);

module.exports = {
  authDb: authSequelize,
  users: userModel(authSequelize, DataTypes),
};
