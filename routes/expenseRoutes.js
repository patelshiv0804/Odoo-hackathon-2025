const express = require('express');
const multer = require('multer');
const path = require('path');
const expenseController = require('../controllers/expenseController');
const saveProfileImages = require('../utils/saveProfileImages'); // Assuming this generates a unique name
const fs = require('fs');
const router = express.Router();

// Define the directory where bill images will be stored
const imageStoragePath = path.join(__dirname, '../billsImage');

// Configure Multer's disk storage
const diskStorage = multer.diskStorage({
  // 'destination' tells Multer where to save the files.
  // This function is executed BEFORE the file is actually written.
  destination: (req, file, cb) => {
    // Ensure the directory exists (good practice, though Multer often creates it)
    if (!fs.existsSync(imageStoragePath)) {
      fs.mkdirSync(imageStoragePath, { recursive: true });
    }
    cb(null, imageStoragePath);
  },
  // 'filename' tells Multer what to name the file in the destination.
  // This function is executed AFTER 'destination' but BEFORE the file is written.
  filename: (req, file, cb) => {
    const uniqueFileName = saveProfileImages(file.originalname);
    // Store the unique filename in req.file directly.
    // Multer will automatically set req.file.filename to this value.
    // The line `req.body.file = uniqueFileName;` from your original code
    // is often used when the frontend sends the filename in a body field,
    // but Multer's req.file.filename is the canonical source after upload.
    // We'll rely on req.file.filename in the controller.
    cb(null, uniqueFileName);
  }
});

// Create a Multer instance configured to use disk storage
const uploadToDisk = multer({ storage: diskStorage });

// Define routes for expense entries
// The 'uploadToDisk.single('file')' middleware will:
// 1. Receive the file named 'file' from the incoming request.
// 2. Save it to the 'billsImage' directory using the configured filename.
// 3. Populate `req.file` with details of the saved file (e.g., `req.file.filename`).
// 4. Then, pass control to the respective expenseController function.
router.post('/add-manual', uploadToDisk.single('file'), expenseController.addManualExpenseEntry);
router.post('/add-ocr', uploadToDisk.single('file'), expenseController.addOcrExpenseEntry);

module.exports = router;