const Router = require("express").Router();
const USER_ROUTE = require('./user.route/user.route');
const APPOINTMENT_ROUTE = require('./appointment.route/appointment.route');
const BOOKING_ROUTE = require('./booking.route/booking.route');
const EXTRA_ROUTE = require('./extra.route/extra.route');

// routes
Router.use(USER_ROUTE)
Router.use(APPOINTMENT_ROUTE)
Router.use(BOOKING_ROUTE)
Router.use(EXTRA_ROUTE)

module.exports = Router;