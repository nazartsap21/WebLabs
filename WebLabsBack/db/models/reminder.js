'use strict';
const { Model, Sequelize } = require('sequelize');
const sequelize = require('../../config/database');


module.exports = sequelize.define('reminder', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  dueDate: {
    type: Sequelize.DATE
  },
  lastUpdated: {
    type: Sequelize.DATE
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  deletedAt: {
    type: Sequelize.DATE
  },
}, {
  paranoid: true,
  freezeTableName: true,
  modelName: 'reminder',
});