const appointmentModel = require('../../models/appointment.model');
var { StatusCodes } = require('http-status-codes');
// appointment add controller 
exports.appointmentAdd = async (req, res) => {
    try {
        const { appointment_title, appointment_description, appointment_status, appointment_data, appointment_time } = req.body;
        var _appointment = await new appointmentModel({
            appointment_data, appointment_time, appointment_status, appointment_title, appointment_description
        })
        await _appointment.save();
        res.status(StatusCodes.OK).send({
            success: true,
            message: "Appointment has been added"
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Intername server error !!"
        })
    }
}
// appointment update controller 
exports.appointmentUpdate = async (req, res) => {
    try {
        const { appointment_title, appointment_description, appointment_status, appointment_data, appointment_time } = req.body;
        var _appointmentUpdate = await appointmentModel.findOneAndUpdate({ _id: req.params.id }, req?.body)
        res.status(StatusCodes.OK).send({
            success: true,
            message: "Appointment has been updated"
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Intername server error !!"
        })
    }
}

//apportment delete controller 
exports.appointmentDelete = async (req, res) => {
    try {
        var _appointmentDelete = await appointmentModel.findOneAndDelete({ _id: req.params.id })
        res.status(StatusCodes.OK).send({
            success: true,
            message: "Appointment has been deleted"
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Intername server error !!"
        })
    }
}

// appointment get contrller 
exports.appointmentGet = async (req, res) => {
    try {
        var _appointmentGEt = await appointmentModel.find();
        res.status(StatusCodes.OK).send({
            success: true,
            data:_appointmentGEt
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Intername server error !!"
        })
    }
}