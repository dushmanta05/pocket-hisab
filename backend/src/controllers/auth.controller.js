const User = require('../models/user.model');
const { verifyPassword } = require('../services/auth.service');
const { signToken } = require('../utils/jwt');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Missing email or password' });
    }

    const user = await User.findOne({ email }).select(['email', 'password']);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User with this email does not exist.' });
    }

    const isVerified = await verifyPassword(user.password, password);

    if (!isVerified) {
      return res
        .status(401)
        .json({ success: false, message: 'The credentials you entered are incorrect.' });
    }

    const token = signToken({ id: user.id, email: user.email });

    return res.status(200).json({
      success: true,
      message: 'Password verified successfully.',
      token,
    });
  } catch (error) {
    console.error('[Login Error]', error);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
};

module.exports = { loginUser };
