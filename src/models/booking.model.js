const mongoose = require('mongoose')

const booking = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "appointment",
        required: true
    },
    booked_on: {
        type: String,
        default: new Date().toDateString()
    }
})

module.exports = mongoose.model("booking", booking);