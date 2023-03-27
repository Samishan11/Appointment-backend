require('dotenv').config();
const express = require("express");
const server = express();

server.listen(5000, ()=>{
    console.log('server running on port 5000')
})