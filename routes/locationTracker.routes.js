const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const sequelize  = require('../config/db.config');
const { Sequelize, DataTypes } = require('sequelize');
const { User, Location } = require('../models/location'); // Import models


  router.post('/', async (req, res) => {
    const { user_id, latitude, longitude } = req.body;
  
    // Check if the user exists
    let user = await User.findByPk(user_id);
    if (!user) {
      user = await User.create({ user_id, imei: req.body.imei });
    }
  
    await Location.create({ user_id, latitude, longitude });
  
    res.status(200).json({ message: 'Location saved successfully!' });
  });

  module.exports = router;