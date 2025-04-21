// src/services/authService.js
const { generateToken } = require('../utils/tokenUtils');

const users = [
  { id: 1, username: 'admin', password: 'password123', role: 'admin'    },
  { id: 2, username: 'scheduler',password: 'schedpass', role: 'scheduler' },
  { id: 3, username: 'caregiver',password: 'carepass', role: 'caregiver' }
];

const authenticateUser = (username, password) => {
  const user = users.find(
    u => u.username === username && u.password === password
  );
  if (!user) {
    return { success: false, message: 'Invalid credentials' };
  }

  const token = generateToken(user);
  return { success: true, token };
};

module.exports = { authenticateUser };
