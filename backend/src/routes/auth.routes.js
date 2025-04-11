const express = require('express');

const { loginUser } = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.get('/login', loginUser);
module.exports = authRouter;
