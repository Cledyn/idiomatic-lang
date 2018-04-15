'use strict';

let movies = require('../../../dump/data/movies.json');

const TECH_TO_TICKET_PRICE_MAP = {"2D": 20, "3D": 30};
const ALL_GENRES = ["COMEDY", "HORROR", "THRILLER", "DRAMA", "HISTORIC", "BIOGRAPHIC", "DOCUMENTARY"];

exports.findMoviesByGenre = function (req, res) {
    let genre = req.params["genreName"];
    let matchingByGenre = findMatching(genre);
    console.log("Matching by genre:" + matchingByGenre);
    res.json(matchingByGenre);
};

exports.get_movie_by_id = function (req, res) {
    let movieIdToGet = +req.params["movieId"]; // IDIOM
    let moviePrice = getPriceForMovie(movieIdToGet);
    console.log("Movie ticket price: " + moviePrice);
    console.log("Get movie by id");
    res.json({"movie_price": moviePrice});
};

function sortMoviesByDuration() { //example for task of adding new UC
    movies.sort(function (a, b) {
        return a.duration - b.duration;
    })
}


function getPriceForMovie(movieId) {
    var filtered_movies = movies.filter((movie) => movie.movie_id === movieId);
    console.log("filtered movies " + filtered_movies);
    let movie_tech = filtered_movies.length && filtered_movies[0].tech || void 0; //IDIOM
    console.log("Movies before sorting: " + movies[0].title);
    sortMoviesByDuration();
    console.log("Movies AFTER sorting: " + movies[0].title);
    return TECH_TO_TICKET_PRICE_MAP[movie_tech]; //todo: add handling on undefined (what will return on get undefined on map)

}

function getMoviesWithProjectionAfter(startDatetime) {
    let startDateTimeObj = new Date(startDatetime);
    let predicateProjections = projections.filter((projection) => new Date(projection.start_datetime) > startDateTimeObj);
    console.log("Matching projections: " + predicateProjections.length + " projections: " + predicateProjections);
    let predicateMovieIds = [];
    for (var proj of predicateProjections) {
        predicateMovieIds.push(+proj.movie_id); // predicateMovieIds[predicateMovieIds.length] = proj.movie_id analysis task example
    }
    console.log("Filtered movie ids: " + predicateMovieIds);
    return predicateMovieIds;
}

function findMovieById(movieIds, movieId) {
    return movies.filter((movie) => movieIds.contains(movie.movie_id))[0];
}

function findMatching(genreName) {
    return movies.filter((movie) => movie.genre === genreName);
}
