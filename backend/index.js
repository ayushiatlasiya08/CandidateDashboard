const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Get all candidates with pagination
app.get('/api/candidates', (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 5; // Default to 5 records per page
  const offset = (page - 1) * limit;

  const query = 'SELECT * FROM candidates LIMIT ? OFFSET ?';
  db.query(query, [limit, offset], (err, results) => {
    if (err) {
      console.error('Error fetching candidates:', err);
      res.status(500).send('Error fetching candidates');
    } else {
      res.json(results);
    }
  });
});

// Get the total number of candidates
app.get('/api/candidates/count', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM candidates';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error counting candidates:', err);
      res.status(500).send('Error counting candidates');
    } else {
      res.json(results[0]);
    }
  });
});

// Add a new candidate
app.post('/api/candidates', (req, res) => {
  const { name, status, date } = req.body;
  const query = 'INSERT INTO candidates (name, status, date) VALUES (?, ?, ?)';
  db.query(query, [name, status, date], (err, result) => {
    if (err) {
      console.error('Error adding candidate:', err);
      res.status(500).send('Error adding candidate');
    } else {
      res.status(201).json({ id: result.insertId, name, status, date });
    }
  });
});

// Update a candidate's status
app.put('/api/candidates/:id', (req, res) => {
  const candidateId = req.params.id;
  const { status } = req.body;
  const query = 'UPDATE candidates SET status = ? WHERE id = ?';
  db.query(query, [status, candidateId], (err, result) => {
    if (err) {
      console.error('Error updating candidate:', err);
      res.status(500).send('Error updating candidate');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Candidate not found');
    } else {
      res.json({ id: candidateId, status });
    }
  });
});

// Delete a candidate
app.delete('/api/candidates/:id', (req, res) => {
  const candidateId = req.params.id;
  const query = 'DELETE FROM candidates WHERE id = ?';
  db.query(query, [candidateId], (err, result) => {
    if (err) {
      console.error('Error deleting candidate:', err);
      res.status(500).send('Error deleting candidate');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Candidate not found');
    } else {
      res.status(204).send();
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
