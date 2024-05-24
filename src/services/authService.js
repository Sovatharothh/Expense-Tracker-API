const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (name, email, password) => {
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    throw new Error('User already exists');
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
    token: generateToken(user.id),
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    };
  } else {
    throw new Error('Invalid credentials');
  }
};

const resetPassword = async (email, newPassword) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('User not found');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return { message: 'Password updated successfully' };
};

module.exports = {
  registerUser,
  loginUser,
  resetPassword,
};
