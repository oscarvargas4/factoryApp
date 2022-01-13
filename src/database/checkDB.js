const mysql = require('mysql2/promise');
const { database } = require('../../ecosystem.config');

// Create Database if does not exists
mysql
  .createConnection({
    user: database.username,
    password: database.password,
  })
  .then((connection) => {
    connection
      .query('CREATE DATABASE IF NOT EXISTS oscar_interview;')
      .then(() => {
        console.log("DATABASE 'oscar_interview' checked");
        process.exit(); // Ctrl + C command line but in script
      });
  });

// ? Drop 'dices' Database & create a new one
// mysql.createConnection({
//     user     : database.username,
//     password : database.password
// }).then((connection) => {
//     connection.query('DROP DATABASE IF EXISTS dices;')
//         .then(() => connection.query('CREATE DATABASE dices')
//         .then(() => {
//             console.log("Database 'dices' created");
//             process.exit(); // Ctrl + C command line but in script
//         }))
// });
