const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'yourSecretKey'; // Secure this with environment variables

// Generate JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
};

// Verify JWT
const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
