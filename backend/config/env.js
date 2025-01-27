require('dotenv').config();

const envConfig = {
  appConfig: {},
  database: {
    mongoURI: process.env.MONGO_URI,
  },
};

module.exports = envConfig;
