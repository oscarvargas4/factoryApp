const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const ProductionDay = sequelize.define('ProductionDay', {
  dayName: {
    type: DataTypes.STRING,
  },
  hoursLimit: {
    type: DataTypes.INTEGER,
  },
  cumulativeHours: {
    type: DataTypes.INTEGER,
  },
});

module.exports = ProductionDay;
