let assert = require('assert');
const httpMocks = require("node-mocks-http");
let bController = require('../server/controller/bookingController');

//todo: implement tests
describe('Basic Mocha String Test', function () {

    it('Should return booking confirmation once booking was successful', function () {
        let validBookingData = {
            "body": {
                "ticket_details": {"normal": 3, "student": 1, "senior": 3},
                "projection_id": 3
            }
        };
        const mockResponse = httpMocks.createResponse();
        bController.book(validBookingData, mockResponse);
        var responseData = JSON.parse(mockResponse._getData());
        assert.equal(responseData["total_price"], 131);
        assert.equal(responseData["booking_id"], 1234)
    });
    it('Should raise exception on booking when too few seats available', function () {
        let validBookingData = {
            "body": {
                "ticket_details": {"normal": 100, "student": 1, "senior": 3},
                "projection_id": 3
            }
        };
        const mockResponse = httpMocks.createResponse();
        let functionThrowingEx = () => bController.book(validBookingData, mockResponse);
        assert.throws(functionThrowingEx, Error, "Could not book - too few seats available.");
    });
    it('Should return booking by id', function () {
    });

    it('Should raise exception when trying to fetch projections without passing datetime', function () {
    });
    it('Should return n projections on passed proper datetime', function () {
    });
    it('Should raise exception when invalid OR future datetime was provided', function () {
    });


    it('Should return n free seats when available for projection', function () {
    });
    it('Should raise not found and 0 seats when invalid id is provided', function () {
    });
    it('Should raise exception when invalid OR future datetime was provided', function () {
    });
});