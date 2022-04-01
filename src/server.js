'use strict';

const express = require('express');
const app = express();

const authRouter = require('./auth/routes.js');
const contentRouter = require('./routes.js');
app.use(express.json()); // NEVER FORGET

app.use(authRouter);
app.use(contentRouter);

function start(PORT) {
  app.listen(PORT, () => console.log('API is listening on PORT:', PORT));
}

module.exports = {
  app,
  start,
};
