const userModel = require("../../models/user.model");
var { StatusCodes } = require('http-status-codes');

const bcryptjs = require('bcryptjs')
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