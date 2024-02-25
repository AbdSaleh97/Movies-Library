'use strict';
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = process.env.PORT || 3003;
const cors = require('cors');

const { Client } = require('pg')
const url = `postgres://abdelrahman:1997@localhost:5432/movies`
const client = new Client(url)

app.use(cors());

//routes
app.get('/', homeHandler);
app.get(`/getMovies`, getMoviesHandler);
app.post(`/addMovies`, addMovieHandler);

//functions
function homeHandler(req, res) {
    res.send("Home page");
}

function getMoviesHandler(req, res) {
    const sql = `SELECT * FROM movie;`;
    client.query(sql).then(data => {
        res.json(data.rows)
    }).catch(error => {
        res.status(500).json({ error: 'Internal Server Error' });
    })
}

function addMovieHandler(req, res) {
    const { title, duration, overview, comment } = req.body
    const sql = `INSERT INTO movie(title, overview,release_date,poster_path,comment)
     VALUES($1, $2 ,$3 ,$4 ,$5) RETURNING *;`;
    const values = [title, overview, release_date, poster_path,comments];
    client.query(sql, values).then(result => {
        console.log(result.rows);
        res.status(201).json(result.rows)
    }).catch(error => {
        res.status(500).json({ error: 'Internal Server Error' });
    })
}

client.connect().then(() => {
    app.listen(port, () => {
        console.log(`listening to port ${port}`);
    })
}).catch(error => {
    res.status(500).json({ error: 'Internal Server Error' });
}
)