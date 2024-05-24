const asyncHandler = require('express-async-handler');
const { registerUser, loginUser, resetPassword } = require('../services/authService');
const AppError = require('../utils/AppError');

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError('Please add all fields', 400));
  }

  const user = await registerUser(name, email, password);
  res.status(201).json(user);
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please add all fields', 400));
  }

  const user = await loginUser(email, password);
  res.json(user);
});

const resetPasswordController = asyncHandler(async (req, res, next) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return next(new AppError('Please add all fields', 400));
  }

  const message = await resetPassword(email, newPassword);
  res.json(message);
});

module.exports = {
  register,
  login,
  resetPasswordController,
};
