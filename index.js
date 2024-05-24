const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./src/data/database');
const authRoutes = require('./src/routes/authRoutes');
const expenseRoutes = require('./src/routes/expenseRoutes');
const setupSwagger = require('./src/swagger');
const errorHandler = require('./src/middleware/errorHandler');
const AppError = require('./src/utils/AppError');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// Setup Swagger
setupSwagger(app);

// Catch all unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Use the error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
