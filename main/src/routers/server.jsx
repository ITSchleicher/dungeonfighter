// TESTING SERVER

// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//     database: process.env.DATABASE_NAME,
//     host: process.env.DATABASE_HOST,
//     password: process.env.DATABASE_PASSWORD,
//     user: process.env.DATABASE_USER,
//     port: process.env.DATABASE_PORT
// });

// module.exports = pool;
// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(express.json())
// app.use(cors());

// app.get("/adduser", (req, res) => {
//     console.log(req.body)
//     res.send("Response Recieved:" + req.body)
// });

// app.listen(5432, () => console.log('Server is running on port 5432'));
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'postgres',
  password: '2580',
  database: 'profile_db'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to database');
});

// Login Endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Database query failed' });
    }

    if (result.length > 0) {
      res.status(200).send({ success: true, message: 'Login successful' });
    } else {
      res.status(401).send({ success: false, message: 'Invalid email or password' });
    }
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});