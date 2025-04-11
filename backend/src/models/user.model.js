const mongoose = require('mongoose');
const { timestampPlugin, fieldRenamePlugin, idTransformPlugin } = require('./plugins');



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
userSchema.plugin(fieldRenamePlugin);
userSchema.plugin(idTransformPlugin);

module.exports = mongoose.model('user', userSchema);
