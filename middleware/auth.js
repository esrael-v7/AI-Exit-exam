const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'stmarys_university_exit_exam_prep_secret_key_2026';

module.exports = function(req, res, next) {
  // Get token from header or cookie
  let token = req.cookies.token;

  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  // If no token, return unauthorized
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info (id, email, full_name, department) to request
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid. Please log in again.' });
  }
};
