require('dotenv').config();
const express = require("express");
const server = express();
const routes = require("./src/routes/index.route");
require("./src/db/connection")();
// 
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api",routes)
server.listen(5000, () => {
    console.log('server running on port 5000')
})