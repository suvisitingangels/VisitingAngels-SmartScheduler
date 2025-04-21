// server/app.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const csvRoutes = require('./routes/csvRoutes');
const authRoutes = require('./routes/authRoutes');
const dbRoutes = require('./routes/dbRoutes');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(`/api/db`, dbRoutes);

app.use('/api', csvRoutes);

module.exports = app;
