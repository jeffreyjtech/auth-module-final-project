'use strict';

const express = require('express');
const app = express();

const authRouter = require('./auth/routes.js');
const contentRouter = require('./routes.js');
app.use(express.json()); // NEVER FORGET

app.use(authRouter);
app.use(contentRouter);

app.use('*', (req, res, next) => {
  let err404 = new Error(`Cannot '${req.method}' at '${req.route}'`);
  err404.status = 404;
  next(err404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message || 'Unknown error');
});

function start(PORT) {
  app.listen(PORT, () => console.log('API is listening on PORT:', PORT));
}

module.exports = {
  app,
  start,
};
