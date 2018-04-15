let allProjections = require('../../../dump/data/projections.json');

exports.getMoviesStartingFrom = function (startDatetime) {
    let matchingMovieIds = [];
    let matchingProjections = getProjectionsStartingFrom(startDatetime);
    for (var proj of matchingProjections) {
        matchingMovieIds[matchingMovieIds.length] = +proj.movie_id; //add this to code analysis tasks
    }
    console.log("Matching movie ids: " + matchingMovieIds);
    return matchingMovieIds;
};
exports.getProjectionById = function (projectionId) {
    return allProjections.filter((projection) => projection.projection_id === projectionId)[0];
};

exports.getProjectionsStartingFrom = function (startDatetime) {
    let startDateTimeObj = new Date(startDatetime);
    let predicateProjections = allProjections.filter((projection) => new Date(projection.start_datetime) > startDateTimeObj);
    console.log("Matching projections: " + predicateProjections.length + " projections: " + predicateProjections);
    return predicateProjections;
};

exports.getPlaceNumberForProjection = function (projectionId) {
    var projections = allProjections.filter((projection) => projection.projection_id === projectionId);
    var placesForProjection = projections[0] && projections[0].seats; //IDIOM add to code analysis task
    return placesForProjection || 0; //IDIOM
};