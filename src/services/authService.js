const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');

const generateToken = (id, secret, expiresIn) => {
  return jwt.sign({ id }, secret, { expiresIn });
};

const generateAccessToken = (id) => {
  return generateToken(id, process.env.JWT_SECRET, '15m');
};

const generateRefreshToken = (id) => {
  return generateToken(id, process.env.JWT_REFRESH_SECRET, '7d');
};

const registerUser = async (name, email, password) => {
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    throw new AppError('User already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    accessToken: generateAccessToken(user.id),
    refreshToken: generateRefreshToken(user.id),
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: generateAccessToken(user.id),
      refreshToken: generateRefreshToken(user.id),
    };
  } else {
    throw new AppError('Invalid credentials', 401);
  }
};

const resetPassword = async (email, newPassword) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return { message: 'Password updated successfully' };
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    throw new AppError('Invalid refresh token', 403);
  }
};

module.exports = {
  registerUser,
  loginUser,
  resetPassword,
  verifyRefreshToken,
};
