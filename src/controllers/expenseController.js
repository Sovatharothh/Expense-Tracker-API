const asyncHandler = require('express-async-handler');
const expenseService = require('../services/expenseService');
const AppError = require('../utils/AppError');

// Create a new expense
const createExpense = asyncHandler(async (req, res, next) => {
  const { name, description, category, amount, currency, date } = req.body;
  const userId = req.user.id;
  const receipt_image = req.file ? req.file.path : null;

  if (!name) {
    return next(new AppError('Please add the name of the expense', 400));
  }

  if (!description) {
    return next(new AppError('Please add the description of the expense', 400));
  }

  if (!category) {
    return next(new AppError('Please add the category of the expense', 400));
  }

  if (amount === undefined || amount === null) {
    return next(new AppError('Please add the amount of the expense', 400));
  }

  if (isNaN(amount)) {
    return next(new AppError('Amount must be a number', 400));
  }

  if (amount <= 0) {
    return next(new AppError('Amount must be a positive number', 400));
  }

  if (!currency) {
    return next(new AppError('Please add currency of the expense', 400));
  }

  if (!date) {
    return next(new AppError('Please add the date of the expense', 400));
  }

  const expense = await expenseService.createExpense(userId, name, description, category, amount, currency, receipt_image, date);
  res.status(201).json({
    status: 201,
    message: 'Expense created successfully',
    expense: expense
});

});


// Get all expenses
const getExpenses = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const expenses = await expenseService.getExpenses(userId);
  res.status(200).json({
    status: 200,
    message: 'You are now viewing all the expenses',
    expenses: expenses
  });
});

// Get an expense by ID
const getExpenseById = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;

  const expense = await expenseService.getExpenseById(id, userId);
  if (!expense) {
    return next(new AppError('Expense not found', 404));
  }
  res.status(200).json({
    status: 200,
    message: 'you are now viewing the detail of expense based on ID',
    expense: expense

   });
});

// Update an expense by ID
const updateExpense = asyncHandler(async (req, res, next) => {
  const { name, description, category, amount, currency, date } = req.body;
  const { id } = req.params;
  const userId = req.user.id;
  const receipt_image = req.file ? req.file.path : req.body.receipt_image;

  if (!name) {
    return next(new AppError('Please add the name of the expense', 400));
  }

  if (!description) {
    return next(new AppError('Please add the description of the expense', 400));
  }

  if (!category) {
    return next(new AppError('Please add the category of the expense', 400));
  }

  if (amount === undefined || amount === null) {
    return next(new AppError('Please add the amount of the expense', 400));
  }

  if (isNaN(amount)) {
    return next(new AppError('Amount must be a number', 400));
  }

  if (amount <= 0) {
    return next(new AppError('Amount must be a positive number', 400));
  }

  if (!currency) {
    return next(new AppError('Please add currency of the expense', 400));
  }

  if (!date) {
    return next(new AppError('Please add the date of the expense', 400));
  }

  const expense = await expenseService.updateExpense(id, userId, name, description, category, amount, currency, receipt_image, date);
  if (!expense) {
    return next(new AppError('Expense not found', 404));
  }
  res.status(200).json({
    status: 200,
    message: 'Expense updated successfully',
    expense: expense
  });
});

// Delete an expense by ID
const deleteExpense = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const expense = await expenseService.deleteExpense(id, userId);
  if (!expense) {
    return next(new AppError('Expense not found', 404));
  }
  res.status(200).json({ 
    status: 200,
    message: 'Expense deleted successfully' 

  });
});

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
