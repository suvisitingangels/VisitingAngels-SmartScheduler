// server/routes/csvRoutes.js

const express = require('express');
const multer = require('multer');
const {
  uploadCSV,
  uploadClassesCSV,
  getCSVData,
  getClassesData,
} = require('../controllers/csvController');

const router = express.Router();

// ⬇️ CHANGED: use memoryStorage so we never hit the filesystem
const storage = multer.memoryStorage();                             // ⬅️ CHANGED
const upload  = multer({ storage });                                // ⬅️ CHANGED

/**
 * POST /upload-schedule-csv
 */
router.post('/upload-schedule-csv', upload.single('file'), uploadCSV);

/**
 * POST /upload-classes-csv
 */
router.post('/upload-classes-csv', upload.single('file'), uploadClassesCSV);

/**
 * GET /csv-data
 */
router.get('/csv-data', getCSVData);

/**
 * GET /classes-data
 */
router.get('/classes-data', getClassesData);

module.exports = router;
