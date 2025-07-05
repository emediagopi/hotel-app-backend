const mongoose = require('mongoose');
require('dotenv').config();
const MenuItem = require('../models/MenuItem');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await MenuItem.insertMany([
    { name: 'Veg Biryani', price: 150, category: 'Main Course' },
    { name: 'Idli', price: 40, category: 'Breakfast' },
    { name: 'Filter Coffee', price: 30, category: 'Beverage' },
  ]);
  console.log('Seeded!');
  process.exit();
});
