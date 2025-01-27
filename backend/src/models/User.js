const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
