/**
     * CSV Controller
     * Handles the upload and processing of CSV files and provides access to the stored data.
*/

const csvDataStore = []; 


/**
     * Upload and process a CSV file.
     * 
     * Validates the uploaded file, parses its content using the `csv-parser` package, 
     * stores the parsed data in memory, and deletes the file afterward.
     * 
     * @param {Object} req - Express request object, containing the uploaded file in `req.file`.
     * @param {Object} res - Express response object, used to send a JSON response.
     * 
     * @returns {void}
*/
exports.uploadCSV = (req, res) => {
  const csvParser = require('csv-parser');
  const fs = require('fs');

  const file = req.file;
  if (!file || !file.originalname.endsWith('.csv')) {
    return res.status(400).json({ error: 'Please upload a valid CSV file.' });
  }

  const filePath = file.path;

  // Read and parse the CSV file
  const results = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', () => {
      fs.unlinkSync(filePath);
      csvDataStore.splice(0, csvDataStore.length, ...results);
      res.status(200).json({ message: 'CSV processed successfully!' });
    })
    .on('error', (err) => {
      // Delete the file after processing and update the in-memory store
      fs.unlinkSync(filePath);
      console.error('Error processing CSV:', err);
      res.status(500).json({ error: 'Error processing CSV file.', details: err.message });
    });
};


// server/controllers/csvController.js

/**
     * Retrieve the stored CSV data.
     * 
     * Responds with the parsed CSV data stored in memory. If no data is available, 
     * it returns a 404 error prompting the user to upload a file first.
     * 
     * @param {Object} req - Express request object (not used in this function).
     * @param {Object} res - Express response object, used to send a JSON response.
     * 
     * @returns {void}
*/
exports.getCSVData = (req, res) => {
  if (csvDataStore.length === 0) {
    return res.status(404).json({ error: 'No data available. Please upload a CSV file first.' });
  }
  res.status(200).json({ data: csvDataStore });
};
