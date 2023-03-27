const appointmentModel = require('../../models/appointment.model');
var { StatusCodes } = require('http-status-codes');
// appointment add controller 
exports.appointmentAdd = async (req, res) => {
    try {
        if (!req.userInfo.isAdmin) {
            return res.status(StatusCodes.UNAUTHORIZED).send({
                success: false,
                message: "Unauthorized Access"
            })
        }
        const { appointment_title, appointment_description, appointment_status, appointment_data, appointment_time } = req.body;
        var _appointment = await new appointmentModel({
            user: req.userInfo._id, appointment_data, appointment_time, appointment_status, appointment_title, appointment_description
        })
        await _appointment.save();
        return res.status(StatusCodes.OK).send({
            success: true,
            message: "Appointment has been added"
        })
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Intername server error !!"
        })
    }
}
// appointment update controller 
exports.appointmentUpdate = async (req, res) => {
    try {
        const { appointment_title, appointment_description, appointment_status, appointment_data, appointment_time } = req.body;
        if (!req.userInfo.isAdmin) {
            return res.status(StatusCodes.UNAUTHORIZED).send({
                success: false,
                message: "Unauthorized Access"
            })
        }
        var _appointmentUpdate = await appointmentModel.findOneAndUpdate({ _id: req.params.id }, req?.body)
        return res.status(StatusCodes.OK).send({
            success: true,
            message: "Appointment has been updated"
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Intername server error !!"
        })
    }
}

//apportment delete controller 
exports.appointmentDelete = async (req, res) => {
    try {
        if (!req.userInfo.isAdmin) {
            return res.status(StatusCodes.UNAUTHORIZED).send({
                success: false,
                message: "Unauthorized Access"
            })
        }
        var _appointmentDelete = await appointmentModel.findOneAndDelete({ _id: req.params.id })
        return res.status(StatusCodes.OK).send({
            success: true,
            message: "Appointment has been deleted"
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Intername server error !!"
        })
    }
}

// appointment get contrller 
exports.appointmentGet = async (req, res) => {
    try {
        var _appointmentGEt = await appointmentModel.find();
        return res.status(StatusCodes.OK).send({
            success: true,
            data: _appointmentGEt
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Intername server error !!"
        })
    }
}