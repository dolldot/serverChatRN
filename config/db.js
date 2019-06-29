'use strict'

const Sequelize = require('sequelize');
const sequelize = new Sequelize('testhariini', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/user.js')(sequelize, Sequelize);
db.chats = require('../models/chat.js')(sequelize, Sequelize);

db.chats.belongsTo(db.users);
db.users.hasMany(db.chats);

module.exports = db;