const mongoose = require('mongoose');
const envConfig = require('./env');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(envConfig.database.mongoURI);
    console.log('MongoDB Connected successfully 🌱');
  } catch (error) {
    console.log('Failed connecting database', error);
  }
};

module.exports = { connectToDatabase };
