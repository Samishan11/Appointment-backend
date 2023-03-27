const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = process.env.DB_URI

const connectDB = async = () => {
    try {
        mongoose.connect(DB_URI).then(()=> {
            console.log('Database connected')
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB;