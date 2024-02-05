'use strict';
const express = require('express');
const app = express();
require('dotenv').config()
const axios = require('axios');

const cors = require('cors');
const port = process.env.PORT
const apiKey = process.env.API_KEY

//routes
app.get('/', homeHandler);
app.get(`/trending`, trendingHandler);
app.get('/search', searchHandler);
app.get(`/tv_series`, TopRatedTv_series)
app.get(`/series_provider`, Tv_series_provider)


//functions
function homeHandler(req, res) {
    res.send("Home page");
}

function trendingHandler(req, res) {
    let url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=en-US`
    axios.get(url)
        .then(result => {
            let trenMovies = result.data.results.map(movie => {
                return new Movies(movie.id, movie.title, movie.release_date, movie.poster_path, movie.overview);
            })
            res.json(trenMovies);
        })
        .catch(error => {
            console.log(error);
        })
}

function searchHandler(req, res) {
    let movieName = `super man`;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}`
    axios.get(url)
        .then(result => {
            let searchedMovies = result.data.results.map(movie => {
                return new Movies(movie.id, movie.title, movie.release_date, movie.poster_path, movie.overview);
            })
            res.json(searchedMovies);
        })
        .catch(error => {
            console.log(error);
        })
}


function TopRatedTv_series(req, res) {
    let url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`
    axios.get(url)
        .then(result => {
            let tv_series = result.data.results.map(series => {
                return new Movies(series.id, series.original_name, series.first_air_date, series.poster_path, series.overview);
            })
            res.json(tv_series);
        })
        .catch(error => {
            console.log(error);
        })
}

function Tv_series_provider(req, res) {
    //taking data from the first API that will return the top tv series then 
    // feed the id of each series to the second API an input to return where can we watch each series 
    let seriesUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`
    axios.get(seriesUrl)
        .then(result => {
            let tv_series = result.data.results.map(series => {
                return series.id;
            })
             axios.get(`https://api.themoviedb.org/3/tv/${tv_series}/watch/providers?api_key=${apiKey}`)
             .then(result => {
                 res.json(result.data)
             })
             .catch(error => {
                 console.log(error)
             })
        })
        .catch(error => {
            console.log(error);
        })
}

function Movies(id, title, date, path, overview) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.path = path;
    this.overview = overview;
}

app.listen(port, () => {
    console.log(`my app is running and  listening on port ${port}`)
})