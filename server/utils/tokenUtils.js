// src/utils/tokenUtils.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

const generateToken = (user) => {
  // embed id, username, AND role
  const payload = {
    id:       user.id,
    username: user.username,
    role:     user.role
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
