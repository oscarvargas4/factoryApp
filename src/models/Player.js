const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Player = sequelize.define('Player', {
    name: {
        type: DataTypes.STRING,
        validate: {
            isAlphanumeric: {
                args: true,
                msg: 'Will only allow alphanumeric characters, so "_abc" will fail'
            },
            len: {
                args: [3, 15],
                msg: 'only allow values with length between 3 and 15'
            }
        }
    },
    winRatePercentage: {
        type: DataTypes.INTEGER
    }
});

module.exports = Player;