const jwt = require('jsonwebtoken');

const { jwtConfig } = require('../../config/env');

const signToken = (payload) => {
  return jwt.sign(payload, jwtConfig.secretKey, {
    expiresIn: Number.parseInt(jwtConfig.expireTime),
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtConfig.secretKey);
};

const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  signToken,
  verifyToken,
  decodeToken,
};
