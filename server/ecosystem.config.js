module.exports = {
  database: {
    username: 'sa',
    password: 'mssqlpsswrd',
    database: 'oscar_interview',
    host: 'localhost',
    port: process.env.PORT,
  },
};

// Command to create database in MSSQL
// sqlcmd -S localhost -U sa -P mssqlpsswrd -Q "CREATE DATABASE oscar_interview;"