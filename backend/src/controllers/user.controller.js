const User = require('../models/user.model');
const { AuthService } = require('../services');
const { validateRequiredFields, filterAllowedFields } = require('../utils/format');

const createUser = async (req, res) => {
  try {
    const requiredFields = ['username', 'firstName', 'lastName', 'password', 'email']

    const validation = validateRequiredFields(req.body, requiredFields)
    if (!validation.success) {
      return res.status(400).json({ success: false, message: validation.message });
    }
    const { username, firstName, lastName, password, email } = validation.data;

    const userData = {
      username,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      password: await AuthService.hashPassword(password),
      email,
    };

    const user = await User.create(userData);
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

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: 'User ID is required.' });
  }

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
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required.',
      });
    }

    console.log(req.body)

    const allowedFields = ['firstName', 'lastName'];
    const updateUserData = filterAllowedFields(req.body, allowedFields);
    console.log(updateUserData);

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

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required.',
      });
    }

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

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
