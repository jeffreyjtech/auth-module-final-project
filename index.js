'use strict';

const app = require('./src/server.js');
const db = require('./src/auth/models');

async function indexStart() {
  await db.sync();
  console.log('Database is synced');
  app.start(process.env.PORT || 3000);
}

indexStart();