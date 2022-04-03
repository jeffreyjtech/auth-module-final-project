'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const threadModel = require('./thread-model.js');
const replyModel = require('./reply-model.js');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:.content';

const sequelize = new Sequelize(DATABASE_URL);
const threads = threadModel(sequelize, DataTypes);
const replies = replyModel(sequelize, DataTypes);

threads.hasMany(replies);
replies.belongsTo(threads);

module.exports = {
  contentDb: sequelize,
  threads: new Collection(threads), 
  replies: new Collection(replies),
};
