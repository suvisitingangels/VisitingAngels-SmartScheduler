// server/app.js

const express = require('express');
const cors = require('cors');
const csvRoutes = require('./routes/csvRoutes');
const authRoutes = require('./routes/authRoutes');
const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: "suvisitingangelsdb.caji6oq84asv.us-east-1.rds.amazonaws.com",     // e.g., 'localhost'
//   user: "VAuser",     // e.g., 'root'
//   password: "0aJo0AD#6#6{", // e.g., 'yourpassword'
//   database: "suvisitingangels", // e.g., 'mydatabase'
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// pool.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error connecting to MySQL:', err);
//       process.exit(1);
//     }
//     console.log('Connected to MySQL successfully!');
//     connection.release();
//     process.exit(0);
//   });


const app = express();

/**
 * Middleware
 *
 * - `cors`: Enables Cross-Origin Resource Sharing to allow requests from different origins.
 * - `express.json`: Parses incoming requests with JSON payloads.
 */
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);


/**
 * Routes
 *
 * All API routes for CSV operations are prefixed with `/api`.
 * The `csvRoutes` module handles specific endpoints for uploading and retrieving CSV data.
 */

app.use('/api', csvRoutes);

module.exports = app;
