// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('./models/User.js'); 
require('dotenv').config(); // Load environment variables

// Middleware to protect routes
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userid).select('-password'); // Attach user to request

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error('Authentication middleware error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
