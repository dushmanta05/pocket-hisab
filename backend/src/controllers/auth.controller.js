const User = require('../models/user.model');
const { verifyPassword } = require('../services/auth.service');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ success: false, message: 'Missing email or password' });
  }

  const user = await User.findOne({ email: email }).select(['email', 'password']);

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: 'User with this email does not exist.' });
  }

  const isVerified = await verifyPassword(user.password, password);

  if (!isVerified) {
    return res.status(401).json({ success: false, message: 'Invalid password.' });
  }
  res.status(200).json({ success: true, message: 'Password verified successfully.' });
};

module.exports = { loginUser };
