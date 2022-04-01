'use strict';

const { authDb } = require('../src/auth/models');
const { contentDb } = require('../src/models');

module.exports = () => {
  authDb.drop();
  contentDb.drop();
};
