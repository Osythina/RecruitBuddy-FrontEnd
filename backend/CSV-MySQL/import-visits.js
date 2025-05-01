const mysql = require('mysql2');
const fs = require('fs');
const csv = require('csv-parser');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '#####', 
  database: 'recruitmentbuddy', 
});

const convertToMySQLDate = (isoDateString) => {
    const date = new Date(isoDateString); 
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  };

const importVisits= () => {
  const visits = [];

  fs.createReadStream('../data/visits.csv') 
    .pipe(csv())
    .on('data', (row) => {
    row.date = convertToMySQLDate(row.date);
      visits.push(row); 
    })
    .on('end', () => {
    
      visits.forEach((visit) => {
        const { name, email, date, department } = visit;
        const query = 'INSERT INTO visits (name, email, date, department) VALUES (?, ?, ?, ?)';

        connection.query(query, [name, email, date, department], (err, results) => {
          if (err) {
            console.error('Error inserting data: ', err);
            return;
          }
          console.log(`Inserted: ${name}`);
        });
      });

      connection.end();
    });
};

importVisits();