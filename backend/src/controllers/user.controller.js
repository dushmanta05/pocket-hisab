const User = require('../models/user.model');

const createUser = async (req, res) => {
  try {
    const { userName, firstName, lastName, password, email } = req.body;
    if (!userName || !fullName || !password || !email) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required.' });
    }

    const userData = {
      userName,
      fullName,
      password,
      email,
    };

    const user = User.create(userData);
    res.status(201).json({
      success: true,
      message: 'User created successfully.',
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user.',
      error: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: 'All users fetched successfully.',
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user.',
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'User data fetched successfully.',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to fetch user.',
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, fullName, password } = req.body;

    // Validate the request body data

    const updateUserData = {
      userName,
      fullName,
      password,
    };

    const updatedUser = await User.findByIdAndUpdate(id, updateUserData, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user.',
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (user) {
      res
        .status(200)
        .json({ success: true, message: 'User deleted successfully.' });
    } else {
      res.status(400).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete user.',
      error: error.message,
    });
  }
};

const loginUser = () => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(404)
      .json({ success: false, message: 'Missing email or password' });
  }

  const user = User.findOne(email);
};

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
