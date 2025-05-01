const mysql = require('mysql2');
const fs = require('fs');
const csv = require('csv-parser');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '#####', 
  database: 'recruitmentbuddy', 
});

const importScholarships = () => {
  const scholarships = [];

  fs.createReadStream('../data/scholarships.csv') 
    .pipe(csv())
    .on('data', (row) => {
      scholarships.push(row); 
    })
    .on('end', () => {
    
      scholarships.forEach((scholarship) => {
        const { name, type, eligibility, amount } = scholarship;
        const query = 'INSERT INTO scholarships (name, type, eligibility, amount) VALUES (?, ?, ?, ?)';

        connection.query(query, [name, type, eligibility, amount], (err, results) => {
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

importScholarships();