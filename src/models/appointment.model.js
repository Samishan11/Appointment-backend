const mongoose = require("mongoose");

const appointmentModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    appointment_title: {
        type: String,
        required: true
    },
    appointment_description: {
        type: String,
        required: true
    },
    appointment_status: {
        type: Boolean,
        default: false
    },
    appointment_date: {
        type: String,
        required: true
    },
    appointment_time: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
})

module.exports = new mongoose.model("appointment", appointmentModel);