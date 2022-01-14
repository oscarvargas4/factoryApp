const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const ProductionDay = sequelize.define('ProductionDay', {
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

module.exports = ProductionDay;
