const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

router.get('/', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

module.exports = router;
