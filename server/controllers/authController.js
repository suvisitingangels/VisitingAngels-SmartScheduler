require('dotenv').config();
const { authenticateUser } = require('../services/authService');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await authenticateUser(username, password);
        if (result.success) {
            return res.status(200).json({ token: result.token });
        }
        return res.status(401).json({ message: result.message });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error during login.' });
    }
};
module.exports = { login };
