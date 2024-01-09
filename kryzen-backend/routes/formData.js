const express = require('express');
const router = express.Router();
const FormData = require('../model/FormData');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create form data
router.post('/submit', authMiddleware,upload.single('photo'), async (req, res) => {
  try {
    const { name, age, address } = req.body;
    // console.log(name,age,address)

    const photo = req.file.buffer.toString('base64');

    const formData = new FormData({
      userId: req.userId,
      name,
      age,
      address,
      photo,
    });
    // console.log(formData);
    await formData.save();
    res.status(201).json({ message: 'Form data submitted successfully' });
  } catch (error) {
    console.error('Error submitting form data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// preview route
router.get('/preview', authMiddleware, async (req, res) => {
    try {
      const formData = await FormData.findOne({ userId: req.userId }).sort({ _id: -1 });
  
      if (!formData) {
        return res.status(404).json({ message: 'Form data not found' });
      }
  
      res.status(200).json(formData);
    } catch (error) {
      console.error('Error fetching form data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router;
