// server/routes/csvRoutes.js

/**
 * CSV Routes
 * 
 * Defines API endpoints for uploading and retrieving CSV data.
 * Uses Multer for handling file uploads.
 */

const express = require('express');
const multer = require('multer');
const {
  uploadCSV,
  uploadClassesCSV,
  getCSVData,
  getClassesData,
} = require('../controllers/csvController');

const router = express.Router();
// Configure Multer for file uploads, specifying the destination folder
const upload = multer({ dest: 'uploads/' }); 

/**
 * POST /upload-schedule-csv
 * 
 * Endpoint to upload and process a schedule CSV file.
 */
router.post('/upload-schedule-csv', upload.single('file'), uploadCSV);

/**
 * POST /upload-classes-csv
 * 
 * Endpoint to upload and process a classes CSV file.
 */
router.post('/upload-classes-csv', upload.single('file'), uploadClassesCSV);

/**
 * GET /csv-data
 * 
 * Endpoint to retrieve the stored schedule CSV data.
 */
router.get('/csv-data', getCSVData);

/**
 * GET /classes-data
 * 
 * Endpoint to retrieve the stored classes CSV data.
 */
router.get('/classes-data', getClassesData);

module.exports = router;
