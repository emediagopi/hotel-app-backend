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

// Update menu item
router.put('/:id', async (req, res) => {
  try {
    const updated = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// Delete menu item
router.delete('/:id', async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});


module.exports = router;
