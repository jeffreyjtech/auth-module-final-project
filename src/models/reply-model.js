'use strict';

const replyModel = (sequelize, DataTypes) => {
  const model = sequelize.define('reply', {
    creator: { type: DataTypes.STRING, required: true},
    bodyText: { type: DataTypes.STRING, require: true },
  });

  return model;
};

module.exports = replyModel;