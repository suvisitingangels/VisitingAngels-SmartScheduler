// src/middlewares/authMiddlewares.js
const { verifyToken } = require('../utils/tokenUtils');

// 1) Ensure we have a valid JWT → populates req.user
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token      = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token.' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ message: 'Invalid token.' });
  }

  req.user = decoded; // { id, username, role, iat, exp }
  next();
};

// 2) Factory to restrict by role(s)
const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: insufficient role.' });
  }
  next();
};

module.exports = { authenticateToken, authorizeRoles };
