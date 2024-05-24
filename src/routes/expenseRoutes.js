const express = require('express');
const { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense } = require('../controllers/expenseController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expense management routes
 */

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - amount
 *               - currency
 *               - date
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *               receipt_image:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       400:
 *         description: Bad request
 */


/**
 * @swagger
 * /api/expenses/{id}:
 *   get:
 *     summary: Get an expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The expense ID
 *     responses:
 *       200:
 *         description: Expense retrieved successfully
 *       404:
 *         description: Expense not found
 *   put:
 *     summary: Update an expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The expense ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *               receipt_image:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Expense not found
 *   delete:
 *     summary: Delete an expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The expense ID
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 */

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - amount
 *               - currency
 *               - date
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *               receipt_image:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       400:
 *         description: Bad request
 *   get:
 *     summary: Get all expenses
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: Successfully retrieved all expenses
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/expenses/{id}:
 *   put:
 *     summary: Update an expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The expense ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *               receipt_image:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Expense not found
 *   delete:
 *     summary: Delete an expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The expense ID
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 */


router.post('/', protect, createExpense);
router.get('/', protect, getExpenses);
router.get('/:id', protect, getExpenseById);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);
module.exports = router;
