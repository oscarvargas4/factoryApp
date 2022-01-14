const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Order = sequelize.define('Order', {
  clientName: {
    type: DataTypes.STRING,
  },
  desiredDay: {
    type: DataTypes.INTEGER,
  },
  deliverDay: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Order;
