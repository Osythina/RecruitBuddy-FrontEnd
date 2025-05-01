const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const {parse} = require('json2csv');

const MAX_BOOKINGS = 5;

const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const visits = [];
    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('data', (row) => visits.push(row))
      .on('end', () => resolve(visits))
      .on('error', (error) => reject(error));
  });
};

const writeCSV = (data, filePath) => {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(filePath);
    csv.write(data, { headers: true }).pipe(ws);
    ws.on('finish', () => {
      console.log('CSV file written successfully');
      resolve();
    });
    ws.on('error', (error) => {
      console.error('Error writing CSV file', error);
      reject(error);
    });
  });
};

const isDateBooked = async (date, filePath) => {
  const visits = await readCSV(filePath);
  const visitCount = visits.filter((visit) => visit.date === date).length;
  return visitCount >= MAX_BOOKINGS;
};

const saveVisit = async (visitData, filePath) => {
  const { name, email, date, department } = visitData;
  if (await isDateBooked(date, filePath)) {
    throw new Error('This date is fully booked. Please select another date.');
  }
  const visits = await readCSV(filePath);
  visits.push({name, email, date, department});


  await writeCSV(visits, filePath);
};

module.exports = { saveVisit, isDateBooked, readCSV,};