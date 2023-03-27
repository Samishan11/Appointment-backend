const users = require("./user.contorller/user.controller");
const appointments = require("./appointment.controller/appointment.controller");
const bookings  = require("../controller/booking.controller/booking.controller");

module.exports = {
    user:users,
    appointment:appointments,
    booking:bookings
}