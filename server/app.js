// server/app.js

/**
     * Main Application File
     * 
     * Sets up the Express application, middleware, and routes for handling CSV operations.
*/

const express = require('express');
const cors = require('cors');
const csvRoutes = require('./routes/csvRoutes');
const authRoutes = require('./routes/authRoutes');

//const { auth } = require('express-openid-connect'); // auth0 dependency

//require('dotenv').config({ path: '../.auth0.env' });// reading in our auth0 id/url/secret

const app = express();

//const config = {
//    authRequired: true,
//    auth0Logout: true,
//    secret: process.env.AUTH0_SECRET,
//    baseURL: 'http://localhost:3001',
//    clientID: process.env.AUTH0_CLIENT_ID,
//    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
//};

// Auth router attaches /login, /logout, and /callback routes to the backend's base URL
//app.use(auth(config));


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

//// call back route
//app.get('/callback', (req, res, next) => {
//    res.oidc.callback()
//        .then(() => res.redirect('http://localhost:3000'))  // Redirect back to home after login
//});

//// Public route for checking if user is logged in
//app.get('/', (req, res) => {
//    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//});


// app.use('/api', auth(config), csvRoutes);
app.use('/api', csvRoutes);


module.exports = app;
