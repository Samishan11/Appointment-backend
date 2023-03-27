const express = require("express");
const router = express.Router();
const {registerUser , loginUser} = require('../../controller/index.controller').user
// routes
router.post('/register-user', registerUser);
router.post('/login-user', loginUser);

module.exports = router;