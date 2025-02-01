const mongoose = require('mongoose');
const timestampPlugin = require('./plugins/timestamp.plugin');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
  },
  {
    collection: 'user',
  }
);

userSchema.plugin(timestampPlugin);

module.exports = mongoose.model('user', userSchema);
