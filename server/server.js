const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)");
});

// Sign Up Endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log('Sign Up Data:', req.body); // Log incoming data

    if (!username || !password) {
        return res.status(400).send({ message: 'Please fill in all fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function (err) {
        if (err) {
            return res.status(400).send({ message: 'User already exists' });
        }
        res.status(201).send({ id: this.lastID, username });
    });
});

// Sign In Endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login Data:', req.body); // Log incoming data

    if (!username || !password) {
        return res.status(400).send({ message: 'Please fill in all fields' });
    }

    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err || !user) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
