'use strict';
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = process.env.PORT || 3000;
//lab14
const { Client } = require('pg')
const url = `postgres://hqxgxihz:vCuMEPCAveHTNSyV1Sd6mguEmxIb_RtS@trumpet.db.elephantsql.com/hqxgxihz`
const client = new Client(url)

//routes
app.get(`/getMovies`, getMoviesHandler);
app.post(`/addMovies`, addMovieHandler);
app.patch('/update/:movieId', updateHandler)
app.get(`/delete/:id`, deleteHandler)
app.get(`/get/:movie`, movieHandler)

//functions
function movieHandler(req, res) {
    let { movie } = req.params;
    let sql = `SELECT * FROM movie WHERE id=$1;`;
    client.query(sql, [movie]).then(result => {
        res.json(result.rows)
    }).catch()
}
function deleteHandler(req, res) {
    const { id } = req.params;
    let sql = 'DELETE FROM movie WHERE id = $1;';
    client.query(sql, [id]).then(result => {
        res.send("Deleted Sucssefully");
    }).catch()
}
function updateHandler(req, res) {
    let mvId = req.params.movieId;
    let { comment } = req.body;
    let sql = `UPDATE movie
    SET comment = $1
    WHERE id = $2 RETURNING *;`;
    let values = [comment, mvId];
    client.query(sql, values).then(resutl => {
        res.json(resutl.rows);
    }).catch()
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
    const sql = `INSERT INTO movie(title, duration, overview,comment)
     VALUES($1, $2 ,$3 ,$4 ) RETURNING *;`;
    const values = [title, duration, overview, comment];
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
})