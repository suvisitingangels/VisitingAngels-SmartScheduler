// src/services/authService.js
require('dotenv').config();
const mysql = require('mysql2');
const { generateToken } = require('../utils/tokenUtils');

const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function authenticateUser(username, password) {
  // 1) fetch user record
  const [rows] = await pool.promise().query(
    'SELECT user_id, b_month, b_day, b_year, status FROM caregivers WHERE user_id = ?',
    [username]
  );

  if (rows.length === 0) {
    return { success: false, message: 'Invalid credentials' };
  }

  const user = rows[0];
  // 2) build expected password: month/day/YY (no leading zeros)
  const mm = parseInt(user.b_month, 10);
  const dd = parseInt(user.b_day,   10);
  const yy = String(user.b_year).slice(-2);
  const expected = `${mm}${dd}${yy}`;

  if (password !== expected) {
    return { success: false, message: 'Invalid credentials' };
  }

  // 3) issue JWT with role = caregiver
  const token = generateToken({
    id:       user.user_id,
    username: user.user_id,
    role:     user.status,
  });

  return { success: true, token };
}

module.exports = { authenticateUser };
