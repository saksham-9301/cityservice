const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createBooking, getUserBookings } = require("../controller/bookingController");

router.post("/", auth, createBooking);
router.get("/my", auth, getUserBookings);

module.exports = router;
