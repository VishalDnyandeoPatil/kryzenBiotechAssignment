const express = require('express');
const router = express.Router();
const FormData = require('../model/FormData');
const authMiddleware = require('../middleware/auth');

// Create form data
router.post('/submit', authMiddleware, async (req, res) => {
  try {
    const { name, age, address, photo } = req.body;
    const formData = new FormData({
      userId: req.userId,
      name,
      age,
      address,
      photo,
    });
    await formData.save();
    res.status(201).json({ message: 'Form data submitted successfully' });
  } catch (error) {
    console.error('Error submitting form data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
