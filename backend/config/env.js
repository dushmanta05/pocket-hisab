require("dotenv").config();

const envConfig = {
  appconfig: {},
  database: {
    mongoURI: process.env.mongo_url,
  },
};

module.exports = envConfig;
