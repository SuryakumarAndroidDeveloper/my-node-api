const sequelize  = require('../config/db.config');
const { Sequelize, DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    imei: {
      type: DataTypes.STRING
    }
  });
  
  const Location = sequelize.define('Location', {
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'user_id'
      }
    },
    latitude: {
      type: DataTypes.FLOAT
    },
    longitude: {
      type: DataTypes.FLOAT
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    }
  });
  
  // Sync the models and create tables
sequelize.sync({ alter: true }).then(() => {
  console.log('Tables created successfully!');
}).catch((err) => {
  console.error('Error syncing database:', err);
});

  module.exports = { User, Location };