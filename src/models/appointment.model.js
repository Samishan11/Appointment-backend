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
    },
    appointment_status: {
        type: Boolean,
        default: false
    },
    appointment_date: {
        type: String,
    },
    appointment_time: {
        type: String,
    },
    image: {
        type: String
    }
})

module.exports = new mongoose.model("appointment", appointmentModel);