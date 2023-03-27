const mongoose = require("mongoose");

const appointmentModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        require: true
    },
    appointment_date: {
        type: String,
        required: true
    },
    appointment_time:{
        type: String,
        required: true
    }
})

module.exports = new mongoose.model("appointment", appointmentModel);