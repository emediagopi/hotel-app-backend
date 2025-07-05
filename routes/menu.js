const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Get all menu items
router.get('/', async (req, res) => {
  const items = await MenuItem.find();
  console.log('Fetched menu items:', items);
  res.json(items);
});

// Add new menu item
router.post('/', async (req, res) => {
  const item = new MenuItem(req.body);
  console.log('Adding new menu item:', item);
  await item.save();
  res.status(201).json(item);
});

module.exports = router;
