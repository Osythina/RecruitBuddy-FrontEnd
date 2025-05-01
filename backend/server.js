const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const {parse} = require('json2csv');
const csvParser = require('csv-parser');
const fastcsv = require('fast-csv');
const { saveVisit } = require('./csvUtils');
const { readCSV } = require('./csvUtils');
const e = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const visitPath = path.join(__dirname, 'data', 'visits.csv');
const programsPath = path.join(__dirname, 'data', 'programs.csv');
const scholarshipsPath = path.join(__dirname, 'data', 'scholarships.csv');

//GETS

app.get('/', (req, res) => {
    res.send('Backend server is running!')
});

app.get('/programs-filter-options', async (req, res) => {
    try {
        let programs = await readCSV(programsPath);
        
        const departments = [...new Set(programs.map((program) => program.department))];
        const types = [...new Set(programs.map((program) => program.type))];
        const durations = [...new Set(programs.map((program) => program.duration))];

        res.json({ departments, types, durations });
    } catch (error) {
        console.error('Error fetching filter options:', error);
        res.status(500).send('Error processing the request');
    }
});

app.get('/scholarships-filter-options', async (req, res) => {
    try {
        let scholarships = await readCSV(scholarshipsPath);
        
        const eligibilities = [...new Set(scholarships.map((scholarship) => scholarship.eligibility))];
        const types = [...new Set(scholarships.map((scholarship) => scholarship.type))];
        const amounts = [...new Set(scholarships.map((scholarship) => scholarship.amount))];

        res.json({ eligibilities, types, amounts });
    } catch (error) {
        console.error('Error fetching filter options:', error);
        res.status(500).send('Error processing the request');
    }
});

app.get('/search-programs', async (req, res) => {
    const { searchTerm, department, duration, type } = req.query;

    try {
        let programs = await readCSV(programsPath);

        if (searchTerm) {
            programs = programs.filter((program) =>
                program.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (department) {
            programs = programs.filter((program) => program.department === department);
        }

        if (duration) {
            programs = programs.filter((program) => program.duration === duration);
        }

        if (type) {
            programs = programs.filter((program) => program.type === type);
        }

        res.json(programs);
    } catch (error) {
        console.error('Error reading Programs CSV:', error);
        res.status(500).send('Error processing the request');
    }
});

app.get('/search-scholarships', async (req, res) => {
    const { searchTerm, eligibility, amount, type } = req.query;

    try {
        let scholarships = await readCSV(scholarshipsPath);

        if (searchTerm) {
            scholarships = scholarships.filter((scholarship) =>
                scholarship.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (eligibility) {
            scholarships = scholarships.filter((scholarship) => scholarship.eligibility === eligibility);
        }

        if (amount) {
            scholarships = scholarships.filter((scholarship) => scholarship.amount === amount);
        }

        if (type) {
            scholarships = scholarships.filter((scholarship) => scholarship.type === type);
        }

        res.json(scholarships);
    } catch (error) {
        console.error('Error reading Scholarship CSV:', error);
        res.status(500).send('Error processing the request');
    }
});

//POSTS

app.post('/save-visit', (req, res) => {
    const {name, email, date, department } = req.body;
    if (!name || !email || !date || !department) {
        return res.status(400).json({ message: 'All fields (name, email, date, department) are required!' })
    }

    const visitData = {
        name, 
        email, 
        date, 
        department,
    };

    saveVisit(visitData, visitPath);

    res.json({ message: 'Visit information saved successfully! '});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

