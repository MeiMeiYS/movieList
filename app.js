const express = require('express');
const app = express();
const movieList = require('./movies.json')
const exphbs = require('express-handlebars')
const port = 3000;

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    // const movies = [{
    //         id: 1,
    //         image: 'https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
    //         title: 'Jurassic World: Fallen Kingdom'
    //     }, {
    //         id: 2,
    //         image: 'https://movie-list.alphacamp.io/posters/rv1AWImgx386ULjcf62VYaW8zSt.jpg',
    //         title: 'Ant-Man and the Wasp'
    //     }
    // ]

    res.render('index', {
        movies: movieList.results
    })
})
app.get('/search', (req, res) => {
    const movies = movieList.results.filter((movie) => {
        return movie.title.toLowerCase().includes(req.query.q.toLowerCase())
    })
    res.render('index', {movies:movies, keyword:req.query.q})
})


app.get('/movies/:movie_id', (req, res) => {
    const movie = movieList.results.filter(movie => {
        return movie.id == req.params.movie_id
    }); res.render('show', {movie: movie[0]})
})

app.listen(port, () => {
    console.log(`Server is now listening on localhost:${port} ...`)
})