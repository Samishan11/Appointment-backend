const appointmentModel = require('../../models/appointment.model');
var { StatusCodes } = require('http-status-codes');
exports.appointment = async (req, res) => {
    try {
        const { appointment_data, appointment_time } = req.body;
        var _appointment = await new appointmentModel({
            appointment_data, appointment_time
        })
        await _appointment.save();
        res.status(StatusCodes.OK).send({
            success: true,
            message: "Appointment has been sheduled"
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Intername server error !!"
        })
    }
}