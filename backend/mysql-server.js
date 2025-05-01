const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',  
  user: 'root',      
  password: '####', 
  database: 'recruitmentbuddy',  
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const convertToMySQLDate = (isoDateString) => {
    const date = new Date(isoDateString); 
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    return `${year}-${month}-${day}`;
};

//GET

app.get('/programs-filter-options', (req, res) => {
    try {
      const query = 'SELECT DISTINCT department, type, duration FROM programs';
      connection.query(query, (err, results) => {
        if (err) {
          console.error('Error fetching filter options:', err);
          return res.status(500).send('Error processing the request');
        }
  
        const departments = [...new Set(results.map((program) => program.department))];
        const types = [...new Set(results.map((program) => program.type))];
        const durations = [...new Set(results.map((program) => program.duration))];
  
        res.json({ departments, types, durations });
      });
    } catch (error) {
      console.error('Error fetching filter options:', error);
      res.status(500).send('Error processing the request');
    }
});

app.get('/scholarships-filter-options', (req, res) => {
  try {
    const query = 'SELECT DISTINCT type, eligibility, amount FROM scholarships';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching filter options:', err);
        return res.status(500).send('Error processing the request');
      }

      const types = [...new Set(results.map((scholarship) => scholarship.type))];
      const eligibilities = [...new Set(results.map((scholarship) => scholarship.eligibility))];
      const amounts = [...new Set(results.map((scholarship) => scholarship.amount))];

      res.json({ types, eligibilities, amounts});
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).send('Error processing the request');
  }
});

app.get('/search-programs', (req, res) => {
    const { searchTerm, department, duration, type } = req.query;
    let query = 'SELECT * FROM programs WHERE 1=1';
  
    if (searchTerm) {
      query += ` AND name LIKE '%${searchTerm}%'`;
    }
  
    if (department) {
      query += ` AND department = '${department}'`;
    }
  
    if (duration) {
      query += ` AND duration = '${duration}'`;
    }
  
    if (type) {
      query += ` AND type = '${type}'`;
    }
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error searching programs:', err);
        return res.status(500).send('Error processing the request');
      }
  
      res.json(results);  
    });
});
  
app.get('/search-scholarships', (req, res) => {
    const { searchTerm, eligibility, amount, type } = req.query;
    let query = 'SELECT * FROM scholarships WHERE 1=1';
  
    if (searchTerm) {
      query += ` AND name LIKE '%${searchTerm}%'`;
    }
  
    if (eligibility) {
      query += ` AND eligibility = '${eligibility}'`;
    }
  
    if (amount) {
      query += ` AND amount = '${amount}'`;
    }
  
    if (type) {
      query += ` AND type = '${type}'`;
    }
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error searching scholarships:', err);
        return res.status(500).send('Error processing the request');
      }
  
      res.json(results);
    });
});

  //POST

app.post('/save-visit', (req, res) => {
    const { name, email, date, department } = req.body;
    console.log(name, email, date, department);
    if (!name || !email || !date || !department) {
      return res.status(400).json({ message: 'All fields (name, email, date, department) are required!' });
    }
    
    newDate = convertToMySQLDate(date);

    const query = 'INSERT INTO visits (name, email, date, department) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, email, newDate, department], (err, results) => {
      if (err) {
        console.error('Error inserting visit data:', err);
        return res.status(500).send('Error processing the request');
      }
      res.json({ message: 'Visit information saved successfully!' });
    });
});

process.on('SIGINT', () => {
    connection.end((err) => {
      if (err) {
        console.error('Error closing MySQL connection:', err);
      }
      console.log('MySQL connection closed');
      process.exit();
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});