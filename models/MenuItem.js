const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: String,
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
