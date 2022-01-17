const { Sequelize } = require("sequelize");
const { database } = require("../../ecosystem.config");

// MySQL
// const sequelize = new Sequelize(
//   database.database,
//   database.username,
//   database.password,
//   {
//     host: database.host,
//     dialect: "mysql",
//   }
// );

// Microsoft SQL Server
const sequelize = new Sequelize(
  database.database,
  database.username,
  database.password,
  {
    dialect: 'mssql',
    host: database.host,
    port: database.port, // Default port
    logging: false, // disable logging; default: console.log

    dialectOptions: {
      requestTimeout: 30000, // timeout = 30 seconds
    },
  }
);


module.exports = sequelize;
