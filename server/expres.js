
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database(':memory:'); // In-memory SQLite for demo
app.use(express.json());
app.use(cors());

// Create users table
db.run(`CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
)`);

// Register route
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Error hashing password' });

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
      if (err) return res.status(500).json({ error: 'User already exists' });
      res.json({ message: 'User registered successfully' });
    });
  });
});

// Sign-In route
app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err || !user) return res.status(404).json({ error: 'User not found' });

    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(401).json({ error: 'Invalid password' });

      // Generate JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, 'secret_key', { expiresIn: '1h' });
      res.json({ message: 'Sign in successful', token });
    });
  });
});

// Middleware to authenticate user
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token.split(' ')[1], 'secret_key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Recipe adding route (protected)
app.post('/recipes', authenticateToken, (req, res) => {
  // Handle adding recipe logic here
  res.json({ message: 'Recipe added successfully' });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
