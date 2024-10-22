const { DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Ensure this path is correct

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database
User.sync();

module.exports = User; // Ensure the model is exported