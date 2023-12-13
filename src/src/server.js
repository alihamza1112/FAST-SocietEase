const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
const port = process.env.PORT || 3001;
const nodemailer = require('nodemailer');

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
      res.json({ exists: true, data: result.rows });
    } else {
      res.json({ exists: false, error: 'Society not found' });
    }
    
    
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/checksociety', async (req, res) => {
  const { updateSociety,alreadysociety } = req.query;

  try {
    const result = await pool.query('SELECT society_name, society_logo,society_description FROM society WHERE society_name = $1 AND society_name <> $2', [updateSociety,alreadysociety]);
    
    if (result.rows.length > 0) {
      res.json({ exists: true, data: result.rows });
    } else {
      res.json({ exists: false, error: 'Society not found' });
    }
    
    
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/Delsociety', async (req, res) => {
  const { title } = req.body;

  try {
    const result1 = await pool.query('DELETE FROM mentor WHERE society_id = (SELECT society_id FROM society WHERE society_name = $1)', [title]);
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



app.post('/addmentor', async (req, res) => {
  const { societyName, mentorName, mentorEmail, mentorImage } = req.body;

  try {
    // Add mentor to the database
    const result = await pool.query('INSERT INTO mentor(society_id, mentor_name, mentor_gmail, mentor_picture) VALUES((SELECT society_id FROM society WHERE society_name = $1), $2, $3, $4)', [
      societyName,
      mentorName,
      mentorEmail,
      mentorImage,
    ]);
    let transporter = nodemailer.createTransport({
      host:"smtp.gmail.com",
      port:587,
      secure:false,
      requireTLS:true,
      auth: {
        user: 'ag7612316@gmail.com',
        pass: 'jsjf pvsa gpun dncb',
      },
    });
    let mail = await transporter.sendMail({
      from: '"FAST SOCIETEASE" <ag7612316@gmail.com>',
      to: `${mentorEmail}`, // Corrected syntax with template literal
      subject: 'You are now a mentor!',
      text: `Dear ${mentorName},\n\nYou have been added as a mentor to the ${societyName} society.\n\nThank you for your commitment.\n\nSincerely,\nThe Society Team`,
    });    
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
app.get('/getmentor', async (req, res) => {
  const { mentorname } = req.query;

  try {
    const result = await pool.query('SELECT mentor_name FROM mentor WHERE mentor_name = $1', [mentorname]);
    
    if (result.rows.length > 0) {
      res.json({ exists: true, data: result.rows });
    } else {
      res.json({ exists: false, error: 'Mentor not found' });
    }
    
    
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.patch('/updatementor/:mentorId', async (req, res) => {
  const { mentorId } = req.params;
  const { society,mentorName, mentorEmail, mentorImage } = req.body;

  try {
    const result = await pool.query('UPDATE mentor SET mentor_name=$1, mentor_gmail=$2, mentor_picture=$3 WHERE mentor_id = $4', [
      mentorName,
      mentorEmail,
      mentorImage,
      mentorId,
    ]);

    if (result.rowCount > 0) {
      let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        requireTLS:true,
        auth: {
          user: 'ag7612316@gmail.com',
          pass: 'jsjf pvsa gpun dncb',
        },
      });
      let mail = await transporter.sendMail({
        from: '"FAST SOCIETEASE" <ag7612316@gmail.com>',
        to: `${mentorEmail}`, // Corrected syntax with template literal
        subject: 'You are now a mentor!',
        text: `Dear ${mentorName},\n\nYou have been added as a mentor to the ${society} society.\n\nThank you for your commitment.\n\nSincerely,\nThe Society Team`,
      });    
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Mentor not found.' });
    }
  } catch (error) {
    console.error('Error updating mentor data in the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/checkmentor', async (req, res) => {
  const { updatementor,alreadymentor } = req.query;

  try {
    const result = await pool.query('SELECT mentor_name FROM mentor WHERE mentor_name = $1 AND mentor_name <> $2', [updatementor,alreadymentor]);
    
    if (result.rows.length > 0) {
      res.json({ exists: true, data: result.rows });
    } else {
      res.json({ exists: false, error: 'Mentor not found' });
    }
    
    
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/addevent', async (req, res) => {
  const { title,imageBase64,description } = req.body;

  try {
    await pool.query('INSERT INTO event(event_name,event_description,event_logo) VALUES($1, $2, $3)', [
      title,description,imageBase64
    ]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error inserting data into database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getevent', async (req, res) => {
  try {
    const result = await pool.query('SELECT event_name,event_description, event_logo FROM event');
    const data = result.rows;
    res.json({ data });
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/geteventbysearch', async (req, res) => {
  const { selectedevent } = req.query;

  try {
    const result = await pool.query('SELECT event_name FROM event WHERE event_name = $1', [selectedevent]);
    
    if (result.rows.length > 0) {
      res.json({ exists: true, data: result.rows });
    } else {
      res.json({ exists: false, error: 'Event not found' });
    }
    
    
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/Delevent', async (req, res) => {
  const { event_name } = req.body;

  try {
    const result1 = await pool.query(
      'DELETE FROM infoevent WHERE event_id = (SELECT event_id FROM event WHERE event_name = $1)',
      [event_name]
    );
    const result = await pool.query(
      'DELETE FROM event WHERE event_name = $1',
      [event_name]
    );

    if (result.rowCount > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'event not found.' });
    }
  } catch (error) {
    console.error('Error deleting data from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/addeventdata', async (req, res) => {
  const { eventName,eventImage } = req.body;

  try {
    const result = await pool.query('INSERT INTO infoevent(event_id, event_data) VALUES((SELECT event_id FROM event WHERE event_name = $1), $2)', [
      eventName,
      eventImage,
    ]);

    res.json({ success: true });
  } catch (error) {
    console.error('Error inserting mentor data into database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/geteventdata', async (req, res) => {
  const { event_name } = req.query;

  try {
    const result = await pool.query(
      'SELECT infoevent.infoevent_id,infoevent.event_data FROM infoevent JOIN event ON infoevent.event_id = event.event_id WHERE event.event_name = $1',
      [event_name]
    );

    const data = result.rows;
    res.json({ data });
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/Deleventdata', async (req, res) => {
  const { eventData_id } = req.body;

  try {
    const result = await pool.query(
      'DELETE FROM infoevent WHERE infoevent_id = $1',
      [eventData_id]
    );

    if (result.rowCount > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'event not found.' });
    }
  } catch (error) {
    console.error('Error deleting data from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
