const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      userId: req.user.id,
      ...req.body
    });

    res.json({ message: "Booking created", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("providerId");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
