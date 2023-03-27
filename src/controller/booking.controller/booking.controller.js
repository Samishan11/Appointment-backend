const booking = require('../../models/booking.model');
const { StatusCodes } = require("http-status-codes");

// appointment booking 
exports.booking = async (req, res) => {
    try {
        const { appointment, booked_on } = req.body;
        const _booking = await new booking({
            appointment,
            user: req.userInfo._id,
            booked_on
        })
        await _booking.save()

        return res.status(StatusCodes.OK).send({
            success: true,
            message: "Appointment has been booked"
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "INTERNAL_SERVER_ERROR !!"
        })
    }
}

// appointment booking update
exports.bookingUpdate = async (req, res) => {
    try {
        const { appointment, booked_on } = req.body;
        var _update = await booking.findOneAndUpdate({ _id: req.params.id }, req?.body);
        return res.status(StatusCodes.OK).send({
            success: true,
            message: "Appointment has been updated"
        })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "INTERNAL_SERVER_ERROR !!"
        })
    }
}

// appointment booking delete
exports.bookingDelete = async (req, res) => {
    try {
        var _delete = await booking.findOneAndDelete({ _id: req.params.id });
        return res.status(StatusCodes.OK).send({
            success: true,
            message: "Appointment has been deleted"
        })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "INTERNAL_SERVER_ERROR !!"
        })
    }
}