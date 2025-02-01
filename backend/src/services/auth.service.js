const argon2 = require('argon2');

const AuthService = {
  async hashPassword(password) {
    return await argon2.hash(password);
  },

  async verifyPassword(hash, password) {
    return await argon2.verify(hash, password);
  },
};

module.exports = AuthService;
