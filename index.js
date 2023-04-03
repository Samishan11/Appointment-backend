require('dotenv').config();
const express = require("express");
const server = express();
const routes = require("./src/routes/index.route");
require("./src/db/connection")();
const PORT = process.env.PORT || 5000
const fileupload = require('express-fileupload'); 
const cors = require("cors");
// 
server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(fileupload({useTempFiles: true}))
server.use(express.static(__dirname))
server.use("/api",routes);

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})