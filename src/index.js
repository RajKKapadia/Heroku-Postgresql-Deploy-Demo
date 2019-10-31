const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'hbs');

app.get('', (req, res) => {
    res.render('index.hbs');
});

const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'CSV-Importer',
    password: 'abc123',
    port: '5433'
});

const insertUser = async (query) => {

    const client = await pool.connect();

    var response = await client.query(query);

    client.release();

    return response['rowCount'];
};

app.post('/add-user', async (req, res) => {
    
    var query = {};
    
    if (req.body.status) {
        query['text'] = 'INSERT INTO users(email, status) VALUES($1, $2)';
        query['values'] = [req.body.email, req.body.status];
    } else {
        query['text'] = 'INSERT INTO users(email, status) VALUES($1, $2)';
        query['values'] = [req.body.email, false];
    }

    let flag = await insertUser(query);
    
    if (flag == 1) {
        res.render('add-user.hbs', {successMessage: 'User added successfully.'});
    } else {
        res.render('add-user.hbs', {errorMessage: 'Something went wrong, please try again.'});
    }
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000.');
});