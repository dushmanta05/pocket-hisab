require('dotenv').config();

const { PORT, NODE_ENV, MONGO_URI } = process.env;

const envConfig = {
  appConfig: {
    port: PORT || 8080,
    nodeEnv: NODE_ENV,
  },
  database: {
    mongoURI: MONGO_URI,
  },
};

module.exports = envConfig;
