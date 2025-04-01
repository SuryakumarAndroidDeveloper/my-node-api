// config/db.config.js
require('dotenv').config();
//const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

// // Create a connection to the database
// const connection = mysql.createConnection({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE,
//   ssl: {
//     rejectUnauthorized: false,
//    // ca: process.env.DB_SSL_CERT,
//   },
// });

// // Open the MySQL connection
// connection.connect(error => {
//   if (error) throw error;
//   console.log('Successfully connected to the database.');
// });
// Create a Sequelize instance and configure the database connection
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
    // ca: process.env.DB_SSL_CERT, // Uncomment if you need SSL
  },
});
// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = sequelize;
