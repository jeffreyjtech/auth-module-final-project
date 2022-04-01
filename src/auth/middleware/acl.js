'use strict';

module.exports = (capability) => {
  return (req, res, next) => {
    console.log('Checking capabilities');
    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      } else {
        let newError = new Error('Access denied');
        newError.status = 403;
        next(newError);
      }
    } catch (e) {
      console.error(e);
      next('Invalid Login');
    }
  };
};
