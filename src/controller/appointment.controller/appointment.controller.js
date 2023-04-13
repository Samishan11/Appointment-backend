const appointmentModel = require("../../models/appointment.model");
var { StatusCodes } = require("http-status-codes");
const cloudinary = require("../../cloudnary/cloudnary");

// appointment add controller
exports.appointmentAdd = async (req, res) => {
  try {
    if (!req.userInfo.isAdmin) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    const { title, status, date, time, time_end, doctor, uuid, detail } =
      req.body;
    const file = req?.files?.image;
    const result = await cloudinary?.uploader?.upload(
      file?.tempFilePath,
      { folder: "user" },
      function (err, docs) {
        if (err) {
          console.log("error:", err.message);
        } else {
          console.log("success", docs);
        }
      }
    );
    var _appointment = await new appointmentModel({
      user: req.userInfo._id,
      title,
      status,
      date,
      time,
      time_end,
      doctor,
      uuid,
      detail,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    await _appointment.save();
    return res.status(StatusCodes.OK).send({
      success: true,
      message: "Appointment has been added",
      data: _appointment,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Intername server error !!",
    });
  }
};
// appointment update controller
exports.appointmentUpdate = async (req, res) => {
  try {
    var find = await appointmentModel.findOne({ _id: req.params.id });
    const file = req?.files?.image;
    const result = await cloudinary?.uploader?.upload(
      file ? file?.tempFilePath : find.image.url,
      { folder: "user" },
      function (err, docs) {
        if (err) {
          console.log("error:", err);
        } else {
          // console.log("success", docs)
        }
      }
    );
    if (!req.userInfo.isAdmin) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    console.log(req.body);
    var _appointmentUpdate = await appointmentModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: req?.body?.title,
        status: req?.body?.status,
        date: req?.body?.date,
        time: req?.body?.time,
        time_end: req?.body?.time_end,
        doctor: req?.body?.doctor,
        detail: req?.body?.detail,
        image: {
          public_id: result?.public_id,
          url: result?.secure_url,
        },
      },
      { new: true }
    );
    console.log(_appointmentUpdate);
    return res.status(StatusCodes.OK).send({
      success: true,
      message: "Appointment has been updated",
      data: _appointmentUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Intername server error !!",
    });
  }
};

//apportment delete controller
exports.appointmentDelete = async (req, res) => {
  try {
    if (!req.userInfo.isAdmin) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    var _appointmentDelete = await appointmentModel.findOneAndDelete({
      _id: req.params.id,
    });
    return res.status(StatusCodes.OK).send({
      success: true,
      message: "Appointment has been deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Intername server error !!",
    });
  }
};

// appointment get contrller
exports.appointmentGet = async (req, res) => {
  try {
    var _appointmentGEt = await appointmentModel.find();
    return res.status(StatusCodes.OK).send({
      success: true,
      data: _appointmentGEt,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Intername server error !!",
    });
  }
};
// single appointment get contrller
exports.appointmentSingleGet = async (req, res) => {
  try {
    var _appointmentGet = await appointmentModel.findOne({
      _id: req.params.id,
    });
    return res.status(StatusCodes.OK).send({
      success: true,
      data: _appointmentGet,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Intername server error !!",
    });
  }
};
