const { verifyToken } = require('../utils/tokenUtils');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Attach decoded user data to the request
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token.' });
    }
};

module.exports = { authenticateToken };
