const express = require('express');

const {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getAllUser);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
