# Subscription Tracker API 🚀

A backend API for managing and tracking subscriptions. This service allows users to add, view, update, and delete their subscription details.

---

## Description

This API provides the core backend functionality for a subscription tracking application. It handles user authentication, subscription data management, and reminders (if implemented). It's built with Node.js, Express.js, and MongoDB.

---

## Folder Structure

The project follows a standard Model-View-Controller (MVC) like pattern for organizing files and folders:

---

## Technologies Used 🛠️

* **Node.js**: JavaScript runtime environment
* **Express.js**: Web framework for Node.js
* **MongoDB**: NoSQL database for storing subscription and user data
* **Mongoose**: ODM library for MongoDB and Node.js
* **jsonwebtoken (JWT)**: For generating and verifying access tokens for authentication
* **bcryptjs**: For hashing passwords
* **dotenv**: For managing environment variables
* **cookie-parser**: Middleware for parsing cookies
* **morgan**: HTTP request logger middleware
* **dayjs**: For date and time manipulations
* **@arcjet/node**: Security middleware
* **@upstash/workflow**: For managing workflows (potentially for reminders or scheduled tasks)
* **nodemon**: For automatically restarting the server during development
* **eslint**: For linting JavaScript code

---

## Setup and Installation ⚙️

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd subscription-tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    This project uses environment-specific `.env` files (e.g., `.env.development.local`, `.env.production.local`).
    Create the relevant `.env` file(s) in the root directory. For local development, you would typically create `.env.development.local`. You can use `.env.example` as a template.

    **Important:** Ensure that `.env.*.local` files containing sensitive credentials (like `.env.production.local`) are added to your `.gitignore` file to prevent them from being committed to version control.

    Your local development environment file (`.env.development.local`) should look something like this:

    ```env
    # PORT
    PORT=5500
    SERVER_URL='http://localhost:5500'

    # ENVIRONMENT
    NODE_ENV='development' # Set to 'production' in .env.production.local

    # DATABASE
    DB_URI="mongodb+srv://your_username:your_password@your_cluster.mongodb.net/?retryWrites=true&w=majority&appName=YourApp"

    # JWT AUTH
    JWT_SECRET='your_strong_jwt_secret'
    JWT_EXPIRES_IN='1d' # Or your preferred expiration

    # ARCJET
    ARCJET_KEY='your_arcjet_key'
    ARCJET_ENV='development' # Set to 'production' in .env.production.local

    # UPSTASH (QSTASH)
    QSTASH_URL='your_qstash_url_if_different_from_default_or_for_production' # e.g., [https://qstash.upstash.io/v2/publish/](https://qstash.upstash.io/v2/publish/)
    QSTASH_TOKEN='your_qstash_token'
    ```

    **Note:**
    * Replace placeholder values (like `your_username`, `your_password`, `your_strong_jwt_secret`, `your_arcjet_key`, `your_qstash_token`) with your actual credentials and keys.
    * The `DB_URI` you provided is an example; ensure you use your correct MongoDB connection string.
    * For production (`.env.production.local`), adjust `NODE_ENV`, `ARCJET_ENV`, and potentially other service URLs/keys accordingly.

4.  **Ensure MongoDB is running** and accessible with the URI provided in your environment file.

---

## Available Scripts 📜

In the project directory, you can run the following commands:

* **`npm start`**:
    Starts the server. This script typically uses environment variables set for the production environment if `NODE_ENV` is set accordingly (e.g., via your hosting platform or `.env.production.local` if `dotenv` is configured to pick it up).
    ```bash
    npm start
    ```

* **`npm run dev`**:
    Starts the server in development mode using `nodemon`. This will automatically restart the server when file changes are detected and will typically use variables from `.env.development.local`.
    ```bash
    npm run dev
    ```

* **Linting (if ESLint is configured for scripts):**
    You might want to add a lint script to your `package.json` like:
    ```json
      "scripts": {
        // ... other scripts
        "lint": "eslint ."
      },
    ```
    Then you can run:
    ```bash
    npm run lint
    ```

---

## API Endpoints Endpoints 🌐

*(This section should be filled out with the specific API endpoints your application provides. Below are some common examples for a subscription tracker. You'll need to define these based on your `controllers` and routes.)*

**Authentication**

* `POST /api/auth/register`: Register a new user.
* `POST /api/auth/login`: Login an existing user.
* `POST /api/auth/logout`: Logout a user.
* `GET /api/auth/me`: Get the currently authenticated user's details.

**Subscriptions**

* `POST /api/subscriptions`: Create a new subscription.
    * **Body**: `{ "name": "Netflix", "billingCycle": "monthly", "price": 15.99, "startDate": "2024-01-01", "renewalDate": "2025-01-01", "category": "Entertainment", "notes": "Shared account" }`
* `GET /api/subscriptions`: Get all subscriptions for the authenticated user.
* `GET /api/subscriptions/:id`: Get a specific subscription by ID.
* `PUT /api/subscriptions/:id`: Update a specific subscription by ID.
* `DELETE /api/subscriptions/:id`: Delete a specific subscription by ID.

*(Remember to document expected request bodies, query parameters, and response formats for each endpoint.)*

---

## Configuration ⚙️

Configuration settings are managed primarily through environment variables loaded via `dotenv`.
Environment-specific configurations are stored in:
* `.env.development.local` for development.
* `.env.production.local` for production.

Ensure the `dotenv` package is configured early in your application's entry point (`app.js`) to load these variables correctly based on `NODE_ENV`. For example:

```javascript
// app.js or a config file
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production.local' });
} else {
  dotenv.config({ path: '.env.development.local' });
}
