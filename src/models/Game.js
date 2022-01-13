const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Game = sequelize.define('Game', {
    gameResult: {
        type: DataTypes.INTEGER,
        validate: {
            min: {
                args: 2,
                msg: "Minimum value: 2"
            },
            max: {
                args: 12,
                msg: "Maximum value: 12" 
            }
        }
    },
    winGame: {
        type: DataTypes.INTEGER
    },
    diceOne: {
        type: DataTypes.INTEGER
    },
    diceTwo: {
        type: DataTypes.INTEGER
    }
});

module.exports = Game;