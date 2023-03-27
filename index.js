require('dotenv').config();
const express = require("express");
const server = express();
const routes = require("./src/routes/index.route");
require("./src/db/connection")();
const PORT = process.env.PORT || 5000

// 
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api",routes);

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})