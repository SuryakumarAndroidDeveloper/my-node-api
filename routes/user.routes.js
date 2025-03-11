// routes/user.routes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
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
    res.json(results);
  });
});

// Define a POST API endpoint to insert data with validation
router.post(
  '/',
  [
    // Validate name
    body('name').isLength({ min: 1 }).withMessage('Name is required'),
    // Validate email
    body('email').isEmail().withMessage('Email is invalid'),
    // Validate password
    body('age').isLength({ min: 1 }).withMessage('Age is required'),
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, age } = req.body;

    // Insert data into the database
    const query = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
    connection.query(query, [name, email, age], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error inserting data into database.');
        return;
      }
      res.status(201).send('User created successfully.');
    });
  }
);


// Define a PUT API endpoint to update data with validation
router.put(
  '/:id',
  [
    body('name').optional().isLength({ min: 1 }).withMessage('Name is required if provided'),
    body('email').optional().isEmail().withMessage('Email is invalid if provided'),
    body('age').optional().isLength({ min: 1 }).withMessage('Age is Required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.id;
    const { name, email, age } = req.body;

    // Build the SQL query dynamically based on provided fields
    let query = 'UPDATE users SET';
    const updates = [];
    const values = [];

    if (name) {
      updates.push('name = ?');
      values.push(name);
    }
    if (email) {
      updates.push('email = ?');
      values.push(email);
    }
    if (age) {
      updates.push('age = ?');
      values.push(age);
    }

    query += ` ${updates.join(', ')} WHERE id = ?`;
    values.push(userId);

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error updating data in database.');
        return;
      }
      res.status(200).send('User updated successfully.');
    });
  }
);

// Define a DELETE API endpoint to delete data
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM users WHERE id = ?';

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error deleting data from database.');
      return;
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('User not found.');
    }
    res.status(200).send('User deleted successfully.');
  });
});

module.exports = router;
