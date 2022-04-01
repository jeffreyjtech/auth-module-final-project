'use strict';

const express = require('express');
const app = express();

const authRouter = require('./auth/routes.js');

app.use(authRouter);

function start(PORT) {
  app.listen(PORT, () => console.log('API is listening on PORT:', PORT));
}

module.exports = {
  app,
  start,
};
