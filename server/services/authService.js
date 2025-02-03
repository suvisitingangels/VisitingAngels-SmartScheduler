const { generateToken } = require('../utils/tokenUtils');

// Simulated user data
const users = [{ id: 1, username: 'admin', password: 'password123' }];

const authenticateUser = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = generateToken(user);
        return { success: true, token };
    }
    return { success: false, message: 'Invalid credentials' };
};

module.exports = { authenticateUser };
