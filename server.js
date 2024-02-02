const express = require('express');

const app = express();
const port = 3001;
const moviesData = require('./Movie Data/data.json');

app.get('/', homeHandler);

function homeHandler(req, res) {
    let obj = moviesData;
    let mov = new Movie(obj.title, obj.poster_path, obj.overview);
    res.json(mov);
}

function Movie(title, path, overview) {
    this.title = title;
    this.path = path;
    this.overview = overview;
}

app.get('/favorite', favoriteHandler);
function favoriteHandler(req, res) {
    res.json("Welcome to Favorite Page");
}

app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

app.use((req, res) => {
    res.status(500).send('Sorry, something went wrong');
});


app.listen(port, () => {
    console.log(`my app is running and  listening on port ${port}`)
})