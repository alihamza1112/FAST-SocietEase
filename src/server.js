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
  const { title,imageBase64,description } = req.body;

  try {
    await pool.query('INSERT INTO society(society_name, society_logo,society_description) VALUES($1, $2, $3)', [
      title,imageBase64,description
    ]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error inserting data into database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getsociety', async (req, res) => {
  try {
    const result = await pool.query('SELECT society_name, society_logo,society_description FROM society');
    const data = result.rows;
    res.json({ data });
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getsocietybysearch', async (req, res) => {
  const { selectedSociety } = req.query;

  try {
    const result = await pool.query('SELECT society_name, society_logo,society_description FROM society WHERE society_name = $1', [selectedSociety]);
    
    if (result.rows.length > 0) {
      const data = result.rows;
      res.json({ data });
    } else {
      res.status(404).json({ error: 'Society not found' });
    }
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.delete('/Delsociety', async (req, res) => {
  const { title } = req.body;

  try {
    const result = await pool.query(
      'DELETE FROM society WHERE society_name = $1',
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

app.patch('/updatesociety', async (req, res) => {
  const { title, description, alreadysociety, imageBase64 } = req.body;


  try {
    
    const existingSociety = await pool.query('SELECT * FROM society WHERE society_name = $1', [alreadysociety]);


    if (existingSociety.rows.length > 0) {
      // Update the existing society
      await pool.query('UPDATE society SET society_name=$1, society_logo=$2, society_description=$3 WHERE society_name=$4', [
        title,
        imageBase64,
        description,
        alreadysociety,
      ]);

      console.log('Update successful.');
      res.json({ success: true });
    } else {
      console.log('Society not found.');
      res.json({ success: false, message: 'Society not found.' });
    }
  } catch (error) {
    console.error('Error updating data in the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... (unchanged code)

app.post('/addmentor', async (req, res) => {
  const { societyName, mentorName, mentorEmail, mentorImage } = req.body;

  try {
    const result = await pool.query('INSERT INTO mentor(society_id, mentor_name, mentor_gmail, mentor_picture) VALUES((SELECT society_id FROM society WHERE society_name = $1), $2, $3, $4)', [
      societyName,
      mentorName,
      mentorEmail,
      mentorImage,
    ]);

    res.json({ success: true });
  } catch (error) {
    console.error('Error inserting mentor data into database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getmentorbysociety', async (req, res) => {
  const { selectedSociety } = req.query;

  try {
    const result = await pool.query('SELECT * FROM mentor WHERE society_id = (SELECT society_id FROM society WHERE society_name = $1)', [selectedSociety]);

    if (result.rows.length > 0) {
      const data = result.rows;
      res.json({ data });
    } else {
      res.status(404).json({ error: 'Mentor not found for the society' });
    }
  } catch (error) {
    console.error('Error fetching mentor data from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.patch('/updatementor/:mentorId', async (req, res) => {
  const { mentorId } = req.params;
  const { mentorName, mentorEmail, mentorImage } = req.body;

  try {
    const result = await pool.query('UPDATE mentor SET mentor_name=$1, mentor_gmail=$2, mentor_picture=$3 WHERE mentor_id = $4', [
      mentorName,
      mentorEmail,
      mentorImage,
      mentorId,
    ]);

    if (result.rowCount > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Mentor not found.' });
    }
  } catch (error) {
    console.error('Error updating mentor data in the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... (unchanged code)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
