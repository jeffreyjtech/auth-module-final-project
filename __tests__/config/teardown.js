'use strict';

const { authDb } = require('../../src/auth/models');

module.exports = () => authDb.drop();
