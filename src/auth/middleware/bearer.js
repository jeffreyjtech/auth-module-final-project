'use strict';

const { users } = require('../models');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new Error('Invalid authorization header');

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    console.log('Good token');
    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    console.error(e);
    e.message = e.message || 'Invalid login';
    next(e);
  }
};
