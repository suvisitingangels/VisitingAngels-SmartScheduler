// server/routes/csvRoutes.js

/**
     * CSV Routes
     * 
     * Defines API endpoints for uploading and retrieving CSV data.
     * Uses Multer for handling file uploads.
*/

const express = require('express');
const multer = require('multer');
const { uploadCSV, getCSVData } = require('../controllers/csvController');

const router = express.Router();
// Configure Multer for file uploads, specifying the destination folder
const upload = multer({ dest: 'uploads/' }); 


/**
     * POST /upload-csv
     * 
     * Endpoint to upload and process a CSV file.
     * Uses Multer middleware to handle file uploads.
     * 
     * @param {Object} req - Express request object, containing the uploaded file in `req.file`.
     * @param {Object} res - Express response object, returns a JSON response with success or error message.
*/
router.post('/upload-csv', upload.single('file'), uploadCSV);


/**
     * GET /csv-data
     * 
     * Endpoint to retrieve the parsed CSV data stored in memory.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object, returns a JSON response with the stored data or an error message.
*/
router.get('/csv-data', getCSVData);

module.exports = router;
