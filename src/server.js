const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
const port = process.env.PORT || 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fyp',
  password: '132477',
  port: 5432,
});

app.post('/addAdmin', async (req, res) => {
  const { username, password } = req.body;

  try {
    await pool.query('INSERT INTO admin(username, password) VALUES($1, $2)', [
      username,
      password,
    ]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error inserting data into database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM admin WHERE username = $1 AND password = $2', [
      username,
      password,
    ]);

    if (result.rows.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/society', async (req, res) => {
  const { title,text,imageBase64 } = req.body;

  try {
    await pool.query('INSERT INTO society(title, text,image) VALUES($1, $2, $3)', [
      title,text,imageBase64,
    ]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error inserting data into database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getsociety', async (req, res) => {
  try {
    const result = await pool.query('SELECT title, text, image FROM society');
    const data = result.rows;
    res.json({ data });
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/Delsociety', async (req, res) => {
  const { title } = req.body;

  try {
    // Use parameterized query to prevent SQL injection
    const result = await pool.query(
      'DELETE FROM society WHERE title = $1',
      [title]
    );

    if (result.rowCount > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Society not found.' });
    }
  } catch (error) {
    console.error('Error deleting data from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/updatesociety', async (req, res) => {
  const { title, text,alreadysociety, imageBase64 } = req.body;

  try {
    // Check if the society with the given name already exists
    const existingSociety = await pool.query('SELECT * FROM society WHERE title = $1', [title]);

    if (existingSociety.rows.length > 0) {
      // Update the existing society
      await pool.query('UPDATE society SET title=$1, text = $1, image = $2 WHERE title = $3', [
        title,
        text,
        imageBase64,
        alreadysociety,
      ]);
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Society not found.' });
    }
  } catch (error) {
    console.error('Error updating data in the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
