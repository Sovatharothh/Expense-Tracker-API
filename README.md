# Expense Tracker API 

The Expense Tracker API provides endpoints to manage user expenses. It allows users to create, retrieve, update, and delete expenses, including uploading receipt images.



## Technologies Used

- Node.js
- Express
- Sequelize 
- PostgreSQL (for database)
- Swagger (for API documentation)
- Multer (for file uploads)
- Other dependencies as listed in `package.json`


## API Endpoints

### Authentication

- **POST `/api/auth/register`**: User registration.
  
- **POST `/api/auth/login`**: User login.
  
- **POST `/api/auth/reset-password`**: Reset user password.
  
### Expenses

- **POST `/api/expenses`**: Create a new expense.
  
- **GET `/api/expenses`**: Get all expenses.
  
- **GET `/api/expenses/:id`**: Get an expense by ID.
  
- **PUT `/api/expenses/:id`**: Update an expense by ID.
  
- **DELETE `/api/expenses/:id`**: Delete an expense by ID.


## Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sovatharothh/Expense-Tracker-API.git
   cd expense-tracker-api

2. **Create the .env file:**

    ```bash
    PORT=3000
    DATABASE_URL="PASTE YOUR DATABASE_URL"
    JWT_SECRET="CREATE YOUR JWT_SECRET"

3. **Install the dependencies:**
    ```bash
    npm install

4. **Run the API:**
    ```bash
    npm start