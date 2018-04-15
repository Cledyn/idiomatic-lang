'use strict';

let movies = require('../../../dump/data/movies.json');

const TECH_TO_TICKET_PRICE_MAP = {"2D": 20, "3D": 30};

exports.findMoviesByGenre = function (req, res) {
    let genre = req.params["genreName"];
    console.log("Movies listed");
    console.log("JSON DATA:" + movies);
    res.json(movies);
};

exports.get_movie_by_id = function (req, res) {
    let movieIdToGet = parseInt(req.params["movieId"]); // NOIDIOM
    let moviePrice = getPriceForMovie(movieIdToGet);
    console.log("Movie ticket price: " + moviePrice);
    console.log("Get movie by id");
    res.json({"movie_price": moviePrice});
};

exports.create_movie = function (req, res) {
    console.log("Movies listed");
    return {}
};

function sortMoviesByDuration() {
    movies.sort(function (a, b) {
        return a.duration - b.duration;
    })
}


function getPriceForMovie(movieId) {
    var filtered_movies = movies.filter((movie) => movie.movie_id === movieId);
    console.log("filtered movies " + filtered_movies);
    let movie_tech;
    if(filtered_movies.length > 0){
     movie_tech = filtered_movies[0].tech;
    }
    console.log("Movies before sorting: "+movies[0].title);
    sortMoviesByDuration();
    console.log("Movies AFTER sorting: "+movies[0].title);
    return TECH_TO_TICKET_PRICE_MAP[movie_tech];

}
function getMoviesWithProjectionAfter(startDatetime) {
    let startDateTimeObj = new Date(startDatetime);
    let predicateProjections = projections.filter((projection) => new Date(projection.start_datetime) > startDateTimeObj);
    console.log("Matching projections: " + predicateProjections.length + " projections: " + predicateProjections);
    let predicateMovieIds = [];
    for (var proj of predicateProjections) {
        predicateMovieIds.push(parseInt(proj.movie_id)); //NOIDIOM?
    }
    console.log("Filtered movie ids: " + predicateMovieIds);
    return predicateMovieIds;
}

function findMovieById(movieIds){
    return movies.filter((movie) => movieIds.contains(movie.movie_id))[0];
}

function findMatching(genreName){
    return movies.filter((movie) => movie.genre === genreName);
}
