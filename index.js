'use strict';

const app = require('./src/server.js');
const db = require('./src/models')

async function indexStart() {
  await db.sync();
  app.start(PORT);
}