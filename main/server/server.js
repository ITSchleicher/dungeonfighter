import dotenv from 'dotenv'; 
dotenv.config(); 
import express from 'express';
import pg from 'pg';
import cors from 'cors';
import { pool, connectToDb } from './connection.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';



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
    const insertResult = await pool.query(insertQuery, [username, email, hashedPassword]);

    const newUser = insertResult.rows[0];

    // // Generate a JWT token (optionally? for now?)
    // const token = jwt.sign(
    //   { id: newUser.id, email: newUser.email }, // Payload
    //   process.env.JWT_SECRET_KEY, 
    //   { expiresIn: '1h' } // Token expiration time
    // );


    // Send response back with the new user (excluding password)
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
  }


  try {
      // Check if email exists in the database
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await pool.query(query, [email]);
      const user = result.rows[0];

      if (!user) {
          return res.status(401).json({ error: 'Invalid email or password1' });
      }

      //Compare the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid email or password!' });
      }

       // Generate a JWT token
       const token = jwt.sign(
        { id: user.id, email: user.email }, // Payload
        process.env.JWT_SECRET_KEY, 
        { expiresIn: '1h' } // Token expiration time
        );

      

      // Successful login
      res.status(200).json({ 
          message: 'Login successful', 
          user: { id: user.id, username: user.username, email: user.email },
          token
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Save Character Route
app.use(bodyParser.json());

// Mock database
const characters = [];
const SECRET_KEY = process.env.JWT_SECRET_KEY; // make secret key easier to type

// Middleware to authenticate the user using JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Unauthorized' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send({ message: 'Forbidden' });
    req.user = user; // Attach user info (decoded token) to the request
    next();
  });
}


// Endpoint to save character data
app.post('/api/saveCharacter', authenticateToken, async (req, res) => {
  const { charName, classLevel, background, playerName, race, alignment, experiencepoints } = req.body;      //add labels

  if (!charName || !classLevel || !background || !playerName || !race || !alignment || !experiencepoints) {           // add labels
    return res.status(400).send({ message: 'Missing required fields.' });
  }

  try {
    // Insert the character data into the database                           add labels
    const insertQuery = `
      INSERT INTO characters (user_id, char_name, class_level, background, player_name, race, alignment, experience_points)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)  
      RETURNING id, user_id, char_name, class_level, background, player_name, race, alignment, experience_points, created_at
    `;
    
    const result = await pool.query(insertQuery, [
      req.user.id, // User ID from the token                                     add labels
      charName,
      classLevel,
      background,
      playerName,
      race,
      alignment,
      experiencepoints
    ]);

    const newCharacter = result.rows[0]; // The newly created character record
    
    // Send response back with the saved character details
    res.status(200).send({ message: 'Character saved successfully!', character: newCharacter });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
});


// Example Login Endpoint to Generate Token
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Replace with real user authentication
  if (username === 'test' && password === 'password') {
    const user = { id: 1, username: 'test' }; // Replace with real user info
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' }); // Generate token
    return res.status(200).send({ token });
  }

  res.status(401).send({ message: 'Invalid credentials' });
});


// Load characters for the authenticated user
app.get('/api/loadCharacter', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM characters WHERE user_id = $1', [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).send('Server error');
  }
});

// Fetch character details by character ID
app.get('/api/character/:id', authenticateToken, async (req, res) => {
  const characterId = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM characters WHERE id = $1', [characterId]);
    if (result.rows.length === 0) {
      return res.status(404).send('Character not found');
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching character details:', error);
    res.status(500).send('Server error');
  }
});


// Update character details by character ID
app.get('/api/character/:id', authenticateToken, async (req, res) => {
  const characterId = req.params.id;

  try {
    const result = await pool.query(
      'SELECT * FROM characters WHERE id = $1 AND user_id = $2',
      [characterId, req.user.id] // Validate user access
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: 'Character not found or unauthorized' });
    }

    res.status(200).json(result.rows[0]); // Send character details
  } catch (error) {
    console.error('Error fetching character details:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});


// Start the server

app.listen(port, () => {
  connectToDb();
  console.log(`Server running on port ${port}`);
});