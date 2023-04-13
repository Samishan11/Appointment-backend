const userModel = require("../../models/user.model");
var { StatusCodes } = require("http-status-codes");
const bcryptjs = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
var adminAttemptCount = 0,
  blockEmail;
const cloudinary = require("../../cloudnary/cloudnary");
const { mail } = require("../../utils/mail");
// register user controller
exports.registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      checkpassword,
      phone,
      address,
      about,
      specialities,
      subspecialities,
      isAdmin,
      isDoctor,
    } = req.body;
    const userExist = await userModel.findOne({ email });
    console.log(req.body);
    if (userExist != null) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: "User already exist !!",
      });
    }
    if (password !== checkpassword) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: "Password not match",
      });
    }

    bcryptjs.hash(password, 10, (e, has_password) => {
      if (e) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          success: false,
          message: "Something went wrong",
        });
      }
      new userModel({
        username,
        phone,
        email,
        isAdmin,
        isDoctor,
        password: has_password,
        createdOn: new Date().toDateString(),
        about,
        specialities,
        subspecialities,
        address,
      })
        .save()
        .then((data) => {
          if (isDoctor || isAdmin) {
            mail().sendMail({
              from: process.env.HOST,
              to: email,
              subject: "Login Credentials",
              html: ` <p style=" font-size:16px;"> 
                        Email: </p><p style="">${email}</p>
                        </p>
                        <p style="font-size:16px "> Password:${password}</p>
                        <p style="text-align:justify; font-size:16px;"></p>`,
            });
          }
          return res.status(StatusCodes.CREATED).send({
            message: "User created succesfully",
            success: true,
            data: data,
          });
        })
        .catch((err) => {
          console.log(err.message);
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send("500 SERVER ERROR!!");
        });
    });
  } catch (error) {
    // console.log(error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Something went wrong!!",
    });
  }
};

// login user controller
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(
        "Client side validation issues. Please carefully send the right format of email and password !!"
      );
  }

  if (adminAttemptCount > 4 && blockEmail === email) {
    return res.status(StatusCodes.FORBIDDEN).send({
      message:
        "You exceed the 5 login attempt. Please try again after 5 min !!",
    });
  }

  try {
    const data = await userModel.findOne({ email: email });

    if (data !== undefined) {
      const isMatched = await data?.matchPassword(password);

      if (!isMatched) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          success: false,
          message: "Email or Password didn't matched",
        });
      }

      const { accessToken, refreshToken } = auth.GenerateJWT({ data });
      const token = jwt.sign(
        {
          _id: data._id,
          username: data.username,
          email: data.email,
          isAdmin: data.isAdmin,
          isDoctor: data.isDoctor,
        },
        process.env.ACCESS_TOKEN_KEY
      );
      return res.status(200).send({
        message: "Login succesfully.",
        token: token,
        accessToken: accessToken,
        refreshToken: refreshToken,
        isAdmin: data.isAdmin,
        isDoctor: data.isDoctor,
        isVerified: data.isVerifed,
      });
    } else {
      adminAttemptCount += 1;
      if (adminAttemptCount === 5) {
        blockEmail = email;
        setTimeout(() => {
          adminAttemptCount = 0;
          blockEmail = null;
          console.log(`${email} you can login. => ${adminAttemptCount}`);
        }, 300000);
      }
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Wrong email or password !!");
    }
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: err.message,
    });
  }
};

// update user controller
exports.updateUser = async (req, res) => {
  console.log(req?.body?.isAdmin === "");
  try {
    var update_ = await userModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        isAdmin: req?.body?.isAdmin === "" ? false : req?.body?.isAdmin,
        isDoctor: req?.body?.isDoctor === "" ? false : req?.body?.isDoctor,
        username: req?.body?.username,
        email: req?.body?.email,
        phone: req?.body?.phone,
        address: req?.body?.address,
        about: req?.body?.about,
        specialities: req?.body?.specialities,
        subspecialities: req?.body?.subspecialities,
        password: req?.body?.password,
      },
      { new: true }
    );
    return res.status(StatusCodes.ACCEPTED).send({
      success: true,
      messgae: "Update sucessfully",
      data: update_,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      messgae: "INTERNAL_SERVER_ERROR !!",
    });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const file = req?.files?.image;
    const result = await cloudinary?.uploader?.upload(
      file?.tempFilePath,
      { folder: "user" },
      function (err, docs) {
        if (err) {
          console.log("error:", err.message);
        } else {
          // console.log("success", docs);
        }
      }
    );
    var update_ = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        image: {
          public_id: result?.public_id,
          url: result?.secure_url,
        },
      },
      { new: true }
    );
    return res.status(StatusCodes.ACCEPTED).send({
      success: true,
      messgae: "Profile Update Sucessfully",
      data: update_,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      messgae: "INTERNAL_SERVER_ERROR !!",
    });
  }
};

// delete user controller
exports.deleteUser = async (req, res) => {
  try {
    var delete_ = await userModel.findOneAndDelete({ _id: req.params.id });
    return res.status(StatusCodes.ACCEPTED).send({
      success: true,
      messgae: "Delete sucessfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      messgae: "INTERNAL_SERVER_ERROR !!",
    });
  }
};
// get user controller
exports.getUsers = async (req, res) => {
  try {
    var get = await userModel.find();
    return res.status(StatusCodes.ACCEPTED).send({
      success: true,
      data: get,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      messgae: "INTERNAL_SERVER_ERROR !!",
    });
  }
};
