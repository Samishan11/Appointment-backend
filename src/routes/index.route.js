const Router = require("express").Router();
const USER_ROUTE = require('./user.route/user.route');
const APPOINTMENT_ROUTE = require('./appointment.route/appointment.route');
const BOOKING_ROUTE = require('./booking.route/booking.route');

// routes
Router.use(USER_ROUTE)
Router.use(APPOINTMENT_ROUTE)
Router.use(BOOKING_ROUTE)

module.exports = Router;