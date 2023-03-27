const router = require("express").Router();
const auth = require("../../middleware/auth");
const { booking, bookingUpdate, bookingDelete, bookingGet } = require("../../controller/index.controller").booking;

// booking route
router.post("/booking", auth.VerifyJWT, booking);
router.get("/booking/get", auth.VerifyJWT, bookingGet);
router.put("/booking/update/:id", auth.VerifyJWT, bookingUpdate);
router.delete("/booking/delete/:id", auth.VerifyJWT, bookingDelete);

module.exports = router;