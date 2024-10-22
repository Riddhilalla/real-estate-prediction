// db.js
const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize
const sequelize = new Sequelize('real-estate', 'root', 'Deepa@1970', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log('MySQL connected');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
  
  module.exports = { sequelize, connectDB }; // Ensure both are exported