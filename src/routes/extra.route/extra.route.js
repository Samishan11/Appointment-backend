const express = require("express");
const router = express.Router();
const { zoomLink } = require('../../controller/index.controller').extra
// user routes
router.post('/create-zoomlink', zoomLink);

module.exports = router;