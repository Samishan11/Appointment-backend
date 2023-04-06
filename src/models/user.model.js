const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userModel = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    },
    phone: {
        type: String
    },
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    password: {
        type: String,
        required: true
    },
    createdOn: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDoctor: {
        type: Boolean,
        default: false
    }
})
userModel.methods.matchPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

module.exports = new mongoose.model("user", userModel);