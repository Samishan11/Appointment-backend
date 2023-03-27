const express = require('express');
const router = express.Router()
const { appointmentAdd, appointmentDelete, appointmentUpdate , appointmentGet } = require('../../controller/index.controller').appointment;
// appointment routes 
router.post('/appointment/add', appointmentAdd)
router.put('/appointment/update/:id', appointmentUpdate)
router.delete('/appointment/delete/:id', appointmentDelete)
router.get('/appointment/get', appointmentGet)

module.exports = router;