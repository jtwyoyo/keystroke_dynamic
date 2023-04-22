const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '171963010Yo',
  database: 'authentication'
});

// connect to the database
connection.connect((error) => {
  if (error) {
    console.error('Failed to connect to the database:', error);
    return;
  }
  console.log('Connected to the database.');
});

// use body-parser middleware to parse JSON data in POST requests
app.use(bodyParser.json());

// handle POST requests to /login
app.post('/login', (req, res) => {
  // get the username and password from the request body
  const { username, password } = req.body;

  // query the database for the user with the given username and password
  const sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
  connection.query(sql, [username, password], (error, results, fields) => {
    console.log(username)
    if (error) {
      console.error('Failed to execute query:', error);
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
    if (results.length === 1) {
      // send a success response if the user exists
      res.status(200).json({ message: 'Login successful.' });
    } else {
      // send an error response if the user does not exist
      res.status(401).json({ message: 'Invalid username or password.' });
    }
  });
});

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Set up routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// set headers to allow cross-origin requests from the login form
app.use((req, res
, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
next();
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log('Server listening on port 3000.')
});