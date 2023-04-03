const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth")
const { appointmentAdd, appointmentDelete, appointmentSingleGet, appointmentUpdate, appointmentGet } = require('../../controller/index.controller').appointment;
// appointment routes 
router.post('/appointment/add', auth.VerifyJWT, appointmentAdd)
router.put('/appointment/update/:id', auth.VerifyJWT, appointmentUpdate)
router.delete('/appointment/delete/:id', auth.VerifyJWT, appointmentDelete)
router.get('/appointment/get', appointmentGet)
router.get('/appointment/:id', appointmentSingleGet)

module.exports = router;