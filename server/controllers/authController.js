const { authenticateUser } = require('../services/authService');

const login = (req, res) => {
    const { username, password } = req.body;
    const result = authenticateUser(username, password);

    if (result.success) {
        res.status(200).json({ token: result.token });
    } else {
        res.status(401).json({ message: result.message });
    }
};

module.exports = { login };
