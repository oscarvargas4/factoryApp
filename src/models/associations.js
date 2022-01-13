const Player = require('./Player');
const Game = require('./Game');

// One-to-Many: Player has many Games
Player.hasMany(Game);
Game.belongsTo(Player);