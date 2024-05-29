const asyncHandler = require('express-async-handler');
const { registerUser, loginUser, resetPassword, verifyRefreshToken } = require('../services/authService');
const AppError = require('../utils/AppError');

// register
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError('Please add all fields', 400));
  }

  const { user, accessToken, refreshToken } = await registerUser(name, email, password);
  res.status(201).json({ user, accessToken, refreshToken });
});


// login
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please add all fields', 400));
  }

  const { user, accessToken, refreshToken } = await loginUser(email, password);
  res.json({ user, accessToken, refreshToken });
});

// reset-password
const resetPasswordController = asyncHandler(async (req, res, next) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return next(new AppError('Please add all fields', 400));
  }

  const message = await resetPassword(email, newPassword);
  res.json(message);
});

// refresh token
const refreshTokenController = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new AppError('Please provide a refresh token', 400));
  }

  const { id } = verifyRefreshToken(refreshToken);
  const accessToken = generateAccessToken(id);
  res.json({ accessToken });
});

module.exports = {
  register,
  login,
  resetPasswordController,
  refreshTokenController,
};
