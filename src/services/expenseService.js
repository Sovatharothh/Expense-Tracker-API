const Expense = require('../models/expenseModel');

const createExpense = async (userId, name, description, category, amount, currency, receipt_image, date) => {
  const expense = await Expense.create({ userId, name, description, category, amount, currency, receipt_image, date });
  return expense;
};

// get all expense
const getExpenses = async (userId) => {
  const expenses = await Expense.findAll({ where: { userId } });
  return expenses;
};

// Get expense by ID
const getExpenseById = async (expenseId, userId) => {
  const expense = await Expense.findOne({ where: { id: expenseId, userId } });
  if (!expense) throw new Error('Expense not found');
  return expense;
};


// update expense by ID
const updateExpense = async (expenseId, userId, name, description, category, amount, currency, receipt_image, date) => {
  const expense = await Expense.findOne({ where: { id: expenseId, userId } });
  if (!expense) throw new Error('Expense not found');

  expense.name = name;
  expense.description = description;
  expense.category = category;
  expense.amount = amount;
  expense.currency = currency;
  expense.receipt_image = receipt_image;
  expense.date = date;

  await expense.save();
  return expense;
};

// delete expense by ID

const deleteExpense = async (expenseId, userId) => {
  const expense = await Expense.findOne({ where: { id: expenseId, userId } });
  if (!expense) throw new Error('Expense not found');

  await expense.destroy();
  return expense;
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
