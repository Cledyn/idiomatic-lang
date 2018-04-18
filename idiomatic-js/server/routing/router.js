'use strict';

module.exports = function (app) {
    var bookingController = require('../controller/bookingController');
    var movieController = require('../controller/movieController'); //add inside movieController service that will handle adding ratings for movie
    var ratingController = require('../controller/ratingController');


    app.route('/genre/:genreName')
        .get(movieController.findMoviesByGenre);

    app.route('/movie/:movieId')
        .get(movieController.get_movie_by_id);

    app.route('/booking')
        .get(bookingController.get_all_bookings)
        .post(bookingController.book); //add possibility to change booking (e.g. number of tickets and type of tickets (with discounts)

    app.route('/booking/:bookingId')
        .get(bookingController.get_booking_by_id)
        .put(bookingController.projections_from);

    app.route('/checkAvailability/:projectionId')
        .get(bookingController.checkFreeSeats);

    app.route('/projections')
        .get(bookingController.get_all_projections);

    app.route('/rateMovie/:movieId')
        .get(ratingController.get_rating)
        .post(ratingController.rate_movie); //add possibility to change booking (e.g. number of tickets and type of tickets (with discounts)

};