const mysql = require('mysql2');
const fs = require('fs');
const csv = require('csv-parser');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '####', 
  database: 'recruitmentbuddy', 
});

const importPrograms = () => {
  const programs = [];

  fs.createReadStream('../data/programs.csv') 
    .pipe(csv())
    .on('data', (row) => {
      programs.push(row); 
    })
    .on('end', () => {
    
      programs.forEach((program) => {
        const { name, department, duration, faculty_name, faculty_title, faculty_email, type } = program;
        const query = 'INSERT INTO programs (name, department, duration, faculty_name, faculty_title, faculty_email, type) VALUES (?, ?, ?, ?, ?, ?, ?)';

        connection.query(query, [name, department, duration, faculty_name, faculty_title, faculty_email, type], (err, results) => {
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

importPrograms();