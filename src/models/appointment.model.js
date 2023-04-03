const mongoose = require("mongoose");

const appointmentModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    time_end: {
        type: String,
    },
    image: {
        public_id :{
            type : String
        },
        url: {
            type: String
        }
    },
})

module.exports = new mongoose.model("appointment", appointmentModel);