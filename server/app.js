const express = require('express');
const cors = require('cors');
const csvRoutes = require('./routes/csvRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', csvRoutes);

module.exports = app;
