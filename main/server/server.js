import express from 'express';
import pg from 'pg';
import cors from 'cors';
import { pool, connectToDb } from './connection.js';

import bcrypt from 'bcrypt';

const app = express();
const port = 5000;
const { Pool } = pg;
// Middleware
app.use(cors());
app.use(express.json());

// Middleware to parse JSON request body (no need for body-parser)


// Register Route
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if email already exists
    const emailCheckQuery = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(emailCheckQuery, [email]);

    if (result.rows.length > 0) {
      return res.status(400).json({ error: 'Email is already registered' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const insertQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const insertResult = await pool.query(insertQuery, [username, email, password]);

    const newUser = insertResult.rows[0];

    // Send response back with the new user (excluding password)
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
      // Fetch user by username
      const query = 'SELECT * FROM users WHERE username = $1';
      const result = await pool.query(query, [username]);
      const user = result.rows[0];

      if (!user) {
          return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Successful login
      res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});



// Start the server

  app.listen(port, () => {
    connectToDb();
    console.log(`Server running on port ${port}`);
  });
