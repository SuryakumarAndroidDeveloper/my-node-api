// config/db.config.js
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', // Replace with your MySQL username
  password: 'root', // Replace with your MySQL password
  database: 'payment_reminder' // Replace with your database name
});

// Open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

module.exports = connection;
