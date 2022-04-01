'use strict';

const threadModel = (sequelize, DataTypes) => {
  const model = sequelize.define('thread', {
    creator: { type: DataTypes.STRING, required: true},
    title: { type: DataTypes.STRING, require: true },
  });

  return model;
};

module.exports = threadModel;