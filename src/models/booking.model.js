const mongoose = require("mongoose");
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const booking = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    validate: [validateEmail, "Please fill a valid email address"],
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointment",
  },
  booked_on: {
    type: String,
    default: new Date().toDateString(),
  },
  status: {
    type: String,
    default: "pending",
  },
  meetingLink: {
    type: String,
  },
});

module.exports = mongoose.model("booking", booking);
