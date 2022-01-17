const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Car = sequelize.define('Car', {
  brand: {
    type: DataTypes.STRING,
  },
  prodTime: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Car;
