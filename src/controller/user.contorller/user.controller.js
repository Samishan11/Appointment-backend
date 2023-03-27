const userModel = require("../../models/user.model");
var { StatusCodes } = require('http-status-codes');
const bcryptjs = require('bcryptjs');
const auth = require("../../middleware/auth")
const jwt = require("jsonwebtoken")
var adminAttemptCount = 0, blockEmail;

// register user controller
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, checkpassword, phone } = req.body;
        const userExist = await userModel.findOne({ email });
        if (userExist != null) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                success: false,
                message: "User already exist !!"
            })
        }
        if (password !== checkpassword) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                success: false,
                message: "Password not match"
            })
        }

        bcryptjs.hash(password, 10, (e, has_password) => {
            if (e) {
                return res.status(StatusCodes.BAD_REQUEST).send({
                    success: false,
                    message: "Something went wrong"
                })
            }
            new userModel({
                username,
                phone,
                email,
                password: has_password,
                createdOn: new Date().toDateString()
            }).save().then(() => {
                return res.status(StatusCodes.CREATED).send('User created succesfully');
            }).catch((err) => {
                console.log(err.message)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('500 SERVER ERROR!!');
            })
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Something went wrong!!"
        })
    }
}

// login user controller
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
        return res.status(StatusCodes.UNAUTHORIZED).send("Client side validation issues. Please carefully send the right format of email and password !!")
    }

    if (adminAttemptCount > 4 && blockEmail === email) {
        return res.status(StatusCodes.FORBIDDEN).send({
            message: 'You exceed the 5 login attempt. Please try again after 5 min !!',
        });
    }

    try {
        const data = await userModel.findOne({ email: email })

        if (data !== undefined) {
            const isMatched = await data?.matchPassword(password);

            if (!isMatched) {
                return res.status(StatusCodes.UNAUTHORIZED).send({
                    success: false,
                    message: "Email or Password didn't matched"
                })
            }

            const { accessToken, refreshToken } = auth.GenerateJWT({ data });
            const token = jwt.sign({ _id: data._id, username: data.username, email: data.email, isAdmin: data.isAdmin, verified: data.verified }, process.env.ACCESS_TOKEN_KEY)
            return res.status(200).send({
                message: 'Login succesfully.',
                token: token,
                accessToken: accessToken,
                refreshToken: refreshToken,
                isAdmin: data.isAdmin,
                isVerified: data.isVerifed
            })
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
            return res.status(StatusCodes.UNAUTHORIZED).send('Wrong email or password !!');
        }
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: err.message
        })
    }
}

// update user controller 
exports.updateUser = async (req, res) => {
    try {
        var update_ = await userModel.findOneAndUpdate({ _id: req.params.id }, req?.body);
        res.status(StatusCodes.ACCEPTED).send({
            success: true,
            messgae: "Update sucessfully"
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            messgae: "INTERNAL_SERVER_ERROR !!"
        })
    }
}

// delete user controller 
exports.deleteUser = async (req, res) => {
    try {
        var delete_ = await userModel.findOneAndDelete({ _id: req.params.id });
        res.status(StatusCodes.ACCEPTED).send({
            success: true,
            messgae: "Delete sucessfully"
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            messgae: "INTERNAL_SERVER_ERROR !!"
        })
    }
}