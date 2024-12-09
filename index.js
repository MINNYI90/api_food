const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection(process.env.DATABASE_URL);

// Basic route
app.get('/', (req, res) => {
    res.send('Hello world!!');
});

// Get all food and drink items
app.get('/food_and_drinks', (req, res) => {
    connection.query('SELECT * FROM food_and_drinks', (err, results) => {
        if (err) {
            console.error('Error fetching food and drinks:', err);
            res.status(500).send('Error fetching items');
        } else {
            res.status(200).json(results);
        }
    });
});

// Get a specific food or drink item by ID
app.get('/food_and_drinks/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM food_and_drinks WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching item by ID:', err);
            res.status(500).send('Error fetching item');
        } else {
            res.status(200).json(results);
        }
    });
});

// Create a new food or drink item
app.post('/food_and_drinks', (req, res) => {
    const { name, category, price, image_url } = req.body;
    connection.query(
        'INSERT INTO food_and_drinks (name, category, price, image_url) VALUES (?, ?, ?, ?)',
        [name, category, price, image_url],
        (err, results) => {
            if (err) {
                console.error('Error adding item:', err);
                res.status(500).send('Error adding item');
            } else {
                res.status(201).json(results);
            }
        }
    );
});

// Get all users (login data)
app.get('/login', (req, res) => {
    connection.query('SELECT * FROM login', (err, results) => {
        if (err) {
            console.error('Error fetching login users:', err);
            res.status(500).send('Error fetching login data');
        } else {
            res.status(200).json(results);
        }
    });
});

// Create a new user (login data)
app.post('/login', (req, res) => {
    const { username, password, name, status } = req.body;
    connection.query(
        'INSERT INTO login (username, password, name, status) VALUES (?, ?, ?, ?)',
        [username, password, name, status],
        (err, results) => {
            if (err) {
                console.error('Error adding login user:', err);
                res.status(500).send('Error adding user');
            } else {
                res.status(201).json(results);
            }
        }
    );
});

// Start server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
});
