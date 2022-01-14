const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const OrdersProductionDay = sequelize.define('OrdersProductionDay', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

module.exports = OrdersProductionDay;
