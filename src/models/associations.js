const Player = require('./Player');
const Game = require('./Game');

const Car = require('./Car');
const Order = require('./Order');
const ProductionDay = require('./ProductionDay');
const OrdersProductionDay = require('./OrdersProductionDay');

// One-to-Many: Player has many Games
Player.hasMany(Game);
Game.belongsTo(Player);

// One-to-Many: Car has many Orders
Car.hasMany(Order);
Order.belongsTo(Car);

// Many-to-Many: Order could has many ProductionDays and ProductionDay could has many orders
Order.belongsToMany(ProductionDay, { through: OrdersProductionDay });
ProductionDay.belongsToMany(Order, { through: OrdersProductionDay });
