'use strict';

const express = require('express');
const router = express.Router();

const { threads } = require('./models');
const bearerAuth = require('./auth/middleware/bearer.js');
const permissions = require('./auth/middleware/acl.js');

router.use(bearerAuth);

router.post('/forum', async (req, res, next) => {
  try {
    let newThread = await threads.create(req.body);
    res.status(201).json(newThread);
  } catch (e) {
    console.error(e);
    next(e.message);
  }
});


module.exports = router;