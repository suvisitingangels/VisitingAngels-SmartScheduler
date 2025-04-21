// server/db/connection.js
require('dotenv').config();
const mysql = require('mysql2');

// Create a connection pool. It's best practice to store sensitive information in environment variables.
const pool = mysql.createPool({
  host: process.env.DB_HOST,     // e.g., 'localhost'
  user: process.env.DB_USER,     // e.g., 'root'
  password: process.env.DB_PASSWORD, // e.g., 'yourpassword'
  database: process.env.DB_NAME, // e.g., 'mydatabase'
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = {pool};