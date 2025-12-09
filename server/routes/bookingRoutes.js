const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createBooking, getUserBookings } = require("../controller/bookingController");

router.post("/",  createBooking);
router.get("/my",  getUserBookings);

module.exports = router;
