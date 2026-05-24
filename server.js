const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Import database to trigger self-healing database checking and setup
const db = require('./config/db');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/exam', require('./routes/exam'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/ai', require('./routes/ai'));

// Elegant SaaS-like page mappings (avoids exposing .html extension)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/exam', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'exam.html'));
});

// Wildcard route to redirect unknown paths back to landing page
app.get('*', (req, res) => {
  res.redirect('/');
});

// Start Express Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`================================================================`);
  console.log(`[Server] AI Exit Exam Prep Server running on port ${PORT}`);
  console.log(`[Server] Local URL: http://localhost:${PORT}`);
  console.log(`================================================================`);
});
