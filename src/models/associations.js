const Player = require('./Player');
const Game = require('./Game');

const Car = require('./Car');
const Order = require('./Order');

// One-to-Many: Player has many Games
Player.hasMany(Game);
Game.belongsTo(Player);

// One-to-Many: Car has many Orders
Car.hasMany(Order);
Order.belongsTo(Car);
