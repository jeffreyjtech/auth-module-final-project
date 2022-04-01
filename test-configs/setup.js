'use strict';

const { authDb } = require('../src/auth/models');
const { contentDb } = require('../src/models');

module.exports = async () => {
  await authDb.sync();
  await contentDb.sync();
  console.log('TEST Database is synced');
};
  