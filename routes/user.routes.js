// routes/user.routes.js
const express = require('express');
const router = express.Router();
const connection = require('../config/db.config');

// Define a simple GET API endpoint
router.get('/', (req, res) => {
  // Query the database
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error retrieving data from database.');
      return;
    }
    console.log(results);
    res.json(results);
  });
});

module.exports = router;
