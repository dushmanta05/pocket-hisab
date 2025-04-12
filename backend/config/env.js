require('dotenv').config();

const { MONGO_URI, JWT_SECRET_KEY, JWT_EXPIRE_TIME } = process.env;

const envConfig = {
  appConfig: {},
  database: {
    mongoURI: MONGO_URI,
  },
  jwtConfig: {
    secretKey: JWT_SECRET_KEY,
    expireTime: JWT_EXPIRE_TIME,
  },
};

module.exports = envConfig;
