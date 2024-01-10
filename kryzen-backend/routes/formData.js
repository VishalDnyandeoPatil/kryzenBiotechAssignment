const express = require('express');
const router = express.Router();
const FormData = require('../model/FormData');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
// const storage =  multer.diskStorage({
//     destination: function (req, file, cb) {
//     //   cb(null, "../kryzen-app/src/image/")
//       cb(null, '../kryzen-app/src/image/')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now();
//       cb(null,  uniqueSuffix+ file.originalname)
//     }
//   })
const upload = multer({ dest:'uploads/'});
const PDFDocument = require('pdfkit');

// Create form data
router.post('/submit', authMiddleware, upload.single('photo'), async (req, res) => {
    // console.log(req.file, req.body,21)
    try {
        const { name, age, address } = req.body;
        const photoUrl = req.file.path;

        // const photo = req.file.buffer.toString('base64');
        // const photo = req.file.path;
        // console.log(typeof(req.file.path))

      const formData = new FormData({
        userId: req.userId,
        name,
        age,
        address,
        photoUrl,
      });
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

// genrate pdf route
router.get('/generate-pdf', authMiddleware, async (req, res) => {
    try {
        const formData = await FormData.findOne({ userId: req.userId }).sort({ _id: -1 });

        if (!formData) {
            return res.status(404).json({ message: 'Form data not found' });
        }

        const pdfDoc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="formData.pdf"');
        pdfDoc.pipe(res);

        // Add content to the PDF
        pdfDoc.text(`Name: ${formData.name}`);
        pdfDoc.text(`Age: ${formData.age}`);
        pdfDoc.text(`Address: ${formData.address}`);

        // Embed the base64-encoded image in the PDF
    const imageBuffer = Buffer.from(formData.photo, 'base64');
    pdfDoc.image(imageBuffer, 100, 100, { width: 200 });

        pdfDoc.end();
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
