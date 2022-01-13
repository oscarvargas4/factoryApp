const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Player = sequelize.define('Player', {
  brand: {
    type: DataTypes.STRING,
  },
  prodTime: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Player;
