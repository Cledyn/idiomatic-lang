'use strict';
let bookings = require('../../data_dump/bookings.json');

let projectionService = require('../service/projectionService');

const ticketTypeToDiscountMap = {"normal": 0, "student": 0.15, "group": 0.20, "senior": 0.1};

const MIN_GROUP_SIZE_FOR_DISCOUNT = 10;
const TICKET_DETAILS_KEY = "ticket_details";
const PROJECTION_ID_KEY = "projection_id";

exports.get_all_projections = function (req, res) {
    return res.json(bookigns);
};

exports.get_all_bookings = function (req, res) {
    return {}
};

exports.book = function (req, res) {
    let bookingDetails = req.body;
    let ticketQuantity = countTicketQuantity(bookingDetails[TICKET_DETAILS_KEY]);
    let response; // UNIDIOM
    let proj = projectionService.getProjectionById(bookingDetails[PROJECTION_ID_KEY]);
    if (Boolean(areVacantSeatsAvailable(proj, ticketQuantity))) { //bezposrednia konwersja do booleana
        response = bookSeats(bookingDetails);
    }
    else {
        response = {"booking_id": undefined, "total_price": undefined};
        console.log("Cannot book tickets, not enough free seats left for this projection.");
    }
    return res.json(response);
};

exports.get_booking_by_id = function (req, res) {
    let bookingIdentifier = parseInt(req.params["bookingId"]); //NOIDIOM
    let foundBooking = getBooking(bookingIdentifier);
    return res.json(foundBooking);
};

exports.projections_from = function (req, res) {
    let bookAfterDatetime = req.body;
    let proj = getProjectionsWithFreeSeats(bookAfterDatetime["datetime"]);
    console.log("Matching projections: " + proj);
    return res.json(proj);
};

exports.checkFreeSeats = function (req, res) {
    let projId = parseInt(req.params["projectionId"]); //NOIDIOM
    let bookedSeatsQuantity = getBookedSeatsQuantity(projId);
    let allSeats = projectionService.getPlaceNumberForProjection(projId);
    let available = allSeats - bookedSeatsQuantity;
    console.log("All seats: " + allSeats + " booked: " + bookedSeatsQuantity + "Available seats: " + available);
    if (available < 0) { // NO halfIDIOM
        available = 0;
    }
    return res.json(available);
};

function getProjectionsWithFreeSeats(datetime, howMany) {
    let projectionsWithPredicate = [];
    let projectionsAfterDatetime = projectionService.getProjectionsStartingFrom(datetime);
    let projection;
    for (var i = 0; i < projectionsAfterDatetime.length; i++) { //IDIOM
        projection = projectionsAfterDatetime[i];
        if (areVacantSeatsAvailable(projection, howMany)) {
            projectionsWithPredicate.push(projection); //NOIDIOM
        }
    }
    return projectionsWithPredicate;
}

function areVacantSeatsAvailable(projection, seatQuantityToBook) {
    let bookedSeatsQuantity = getBookedSeatsQuantity(projection.projection_id);
    return projection.seats >= bookedSeatsQuantity + seatQuantityToBook
}

function bookSeats(bookingRequest) {
    console.log("Booking seats.");
    var totalTicketCost = calculateTotalPrice(bookingRequest[TICKET_DETAILS_KEY], 20);
    return {"booking_id": 1234, "total_price": totalTicketCost};

}

function getBookedSeatsQuantity(projectionId) {
    let bookingsForProjection = bookings.filter((booking) => booking.projection_id === projectionId);
    console.log("Bookings for projection: " + bookingsForProjection.length);
    if (bookingsForProjection.length > 0) {
        return countBookedPlaces(bookingsForProjection);
    }
    else {
        return 0;
    }
}

function countBookedPlaces(bookingsForProjection) {
    let seatsNumber = 0;
    let booking;
    for (var i = 0; i < bookingsForProjection.length; i++) {
        booking = bookingsForProjection[i];
        var places = countTicketQuantity(booking[TICKET_DETAILS_KEY]);
        seatsNumber = seatsNumber + places;
        console.log(" Places for booking: " + booking[PROJECTION_ID_KEY] + " places: " + places + " seats number: " + seatsNumber);
    }
    return seatsNumber;

}

function calculateTotalPrice(ticketDetails, normalTicketPrice) {
    let totalCost = 0.0;
    let totalNumOfTickets; //IDIOM
    if (totalNumOfTickets = countTicketQuantity(ticketDetails)) {
        if (totalNumOfTickets >= MIN_GROUP_SIZE_FOR_DISCOUNT) {
            totalCost = normalTicketPrice * (1.0 - ticketTypeToDiscountMap["group"]) * totalNumOfTickets;
        }
        else {
            for (let [discountName, numOfTickets] of Object.entries(ticketDetails)) {
                let ticketsPrice = normalTicketPrice * (1.0 - ticketTypeToDiscountMap[discountName]) * numOfTickets;
                totalCost = totalCost + ticketsPrice;
            }
        }
    }
    else {
        throw Error("There must be at least 1 ticket on every booking!");
    }
    return totalCost;
}

function countTicketQuantity(ticketDetails) {
    return Object.entries(ticketDetails).reduce(function (totalTicketQuantity, ticketTypeEntry) {
        const [discountType, quantity] = ticketTypeEntry;
        return totalTicketQuantity + quantity;
    }, 0);
}


function calcTicketsPrice(ticketDetails, normalTicketPrice) {
    return Object.entries(ticketDetails).reduce(function (totalCost, ticket_type_entry) {
        const [discount_type, quantity] = ticket_type_entry;
        return totalCost + (quantity * (1.0 - ticketTypeToDiscountMap[discount_type]) * normalTicketPrice);
    }, 0);
}

function getBooking(bookingId) {
    let matchingBookings = bookings.filter((booking) => booking.booking_id === bookingId);
    let matchingBooking = undefined;
    if (matchingBookings.length > 0) { //NOIDIOM
        matchingBooking = matchingBookings[0];
    }
    return matchingBooking;
}


//todo: fragment for modification task
function calcTotalPriceIdiom(ticketDetails, normalTicketPrice) {
    let totalCost = calcTicketsPrice(ticketDetails, normalTicketPrice);
    if (totalCost && countTicketQuantity(ticketDetails) >= MIN_GROUP_SIZE_FOR_DISCOUNT) { //NOIDIOM
        //todo: add discount for group
    }
    return totalCost;
}