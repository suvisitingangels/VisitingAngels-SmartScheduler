// server/app.js

const express = require('express');
const cors = require('cors');

const csvRoutes = require('./routes/csvRoutes');
const authRoutes = require('./routes/authRoutes');
const dbRoutes = require('./routes/dbRoutes');

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
app.use(`/api/db`, dbRoutes);


/**
 * Routes
 *
 * All API routes for CSV operations are prefixed with `/api`.
 * The `csvRoutes` module handles specific endpoints for uploading and retrieving CSV data.
 */

app.use('/api', csvRoutes);

module.exports = app;
