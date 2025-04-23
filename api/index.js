const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const {Pool} = require('pg')
const port = 8080;

var variableExample = ''

app.use(cors());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: '####',
    password: '####',
    port: '####'
});

app.get('/GetRequestExample', async (req, res) => {
    try {
        const GetRequestExample = await pool.query(`SELECT ###### FROM DATABASE`);
        res.status(200).send(GetRequestExample);
    } catch (err) {
        console.error('Error saving text:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/PostRequestExample', async (req) => {
    PostRequestExample = req.body.Example
})

app.listen(port, () => {
    console.log('Server running on http://localhost:8080/');
});