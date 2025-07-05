const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  date: String,
  people: Number,
  notes: String,
});

module.exports = mongoose.model('Booking', bookingSchema);
