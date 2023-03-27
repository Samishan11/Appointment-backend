const express = require("express");
const router = express.Router();
const {registerUser} = require('../../controller/index.controller').user
// routes
router.post('/register-user', registerUser);
module.exports = router;