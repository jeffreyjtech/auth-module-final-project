'use strict';

const { authDb } = require('../src/auth/models');

module.exports = async () => {
  await authDb.sync();
  console.log('TEST Database is synced');
};
  