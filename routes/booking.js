const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/", async (req, res) => {
  try {
    const { name, tableSize, notes, dateTime } = req.body;

    if (!name || !tableSize || !dateTime) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const booking = new Booking({
      name,
      tableSize,
      notes,
      dateTime: new Date(dateTime), // Assuming dateTime is a full ISO string like "2025-07-06T19:30:00"
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save booking" });
  }
});


router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log("Updated booking item:", updated);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update booking" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

// GET /api/bookings/upcoming
router.get('/upcoming', async (req, res) => {
  try {
    const now = new Date();

    const upcomingBookings = await Booking.find({
      dateTime: { $gte: now }
    }).sort({ dateTime: 1 });

    res.json(upcomingBookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch upcoming bookings' });
  }
});
router.get('/past', async (req, res) => {
  const now = new Date();
  const bookings = await Booking.find({ dateTime: { $lt: now } }).sort({ dateTime: -1 });
  res.json(bookings);
});

router.get('/by-date', async (req, res) => {
  const { date } = req.query; // expected format: '2025-07-07'

  if (!date) return res.status(400).json({ error: 'Missing date' });

  const start = new Date(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  const bookings = await Booking.find({
    dateTime: { $gte: start, $lt: end },
  }).sort({ dateTime: 1 });

  res.json(bookings);
});



module.exports = router;
