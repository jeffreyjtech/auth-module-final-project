'use strict';

const app = require('./src/server.js');
const { authDb } = require('./src/auth/models');
const { contentDb } = require('./src/models');

async function indexStart() {
  await authDb.sync();
  await contentDb.sync();
  console.log('Database is synced');
  app.start(process.env.PORT || 3000);
}

indexStart();