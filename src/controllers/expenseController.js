const asyncHandler = require('express-async-handler');
const expenseService = require('../services/expenseService');
const AppError = require('../utils/AppError');

// Create a new expense
const createExpense = asyncHandler(async (req, res, next) => {
  const { name, description, category, amount, currency, receipt_image, date } = req.body;
  const userId = req.user.id;

  if (!name || !category || !amount || !currency || !date) {
    return next(new AppError('Please add all required fields', 400));
  }

  const expense = await expenseService.createExpense(userId, name, description, category, amount, currency, receipt_image, date);
  res.status(201).json(expense);
});

// Get all expenses
const getExpenses = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const expenses = await expenseService.getExpenses(userId);
  res.status(200).json(expenses);
});

// Get an expense by ID
const getExpenseById = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;

  const expense = await expenseService.getExpenseById(id, userId);
  if (!expense) {
    return next(new AppError('Expense not found', 404));
  }
  res.status(200).json(expense);
});

// Update an expense by ID
const updateExpense = asyncHandler(async (req, res, next) => {
  const { name, description, category, amount, currency, receipt_image, date } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  const expense = await expenseService.updateExpense(id, userId, name, description, category, amount, currency, receipt_image, date);
  if (!expense) {
    return next(new AppError('Expense not found', 404));
  }
  res.status(200).json(expense);
});

// Delete an expense by ID
const deleteExpense = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const expense = await expenseService.deleteExpense(id, userId);
  if (!expense) {
    return next(new AppError('Expense not found', 404));
  }
  res.status(200).json({ message: 'Expense deleted successfully' });
});

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
