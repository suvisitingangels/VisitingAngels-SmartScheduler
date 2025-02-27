/**
 * CSV Controller
 * Handles the upload and processing of CSV files and provides access to the stored data.
 */

const csvDataStore = [];        // In-memory store for schedule CSV data
const classesDataStore = [];    // In-memory store for classes CSV data

/**
 * Upload and process a schedule CSV file.
 * 
 * Validates the uploaded file, parses its content using the `csv-parser` package, 
 * stores the parsed data in memory, and deletes the file afterward.
 * 
 * @param {Object} req - Express request object, containing the uploaded file in `req.file`.
 * @param {Object} res - Express response object, used to send a JSON response.
 */
exports.uploadCSV = (req, res) => {
  const csvParser = require('csv-parser');
  const fs = require('fs');

  const file = req.file;
  if (!file || !file.originalname.endsWith('.csv')) {
    return res.status(400).json({ error: 'Please upload a valid CSV file.' });
  }

  const filePath = file.path;
  const results = [];
  
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', () => {
      fs.unlinkSync(filePath);
      csvDataStore.splice(0, csvDataStore.length, ...results);
      res.status(200).json({ message: 'Schedule CSV processed successfully!' });
    })
    .on('error', (err) => {
      fs.unlinkSync(filePath);
      console.error('Error processing CSV:', err);
      res.status(500).json({ error: 'Error processing CSV file.', details: err.message });
    });
};

/**
 * Upload and process a classes CSV file.
 * 
 * Validates the uploaded file, parses its content using the `csv-parser` package,
 * processes the "classes" field by splitting a comma-separated list into an array,
 * stores the parsed data in memory, and deletes the file afterward.
 * 
 * @param {Object} req - Express request object, containing the uploaded file in `req.file`.
 * @param {Object} res - Express response object, used to send a JSON response.
 */
exports.uploadClassesCSV = (req, res) => {
  const csvParser = require('csv-parser');
  const fs = require('fs');

  const file = req.file;
  if (!file || !file.originalname.endsWith('.csv')) {
    return res.status(400).json({ error: 'Please upload a valid CSV file.' });
  }

  const filePath = file.path;
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      // Process the "classes" field: split the comma-separated string into an array.
      if (row.classes) {
          row.classes = row.classes.split(',').map((cls) => cls.trim()); //this if is useless
        }   
      results.push(row);
    })
    .on('end', () => {
      fs.unlinkSync(filePath);
      classesDataStore.splice(0, classesDataStore.length, ...results);
      res.status(200).json({ message: 'Classes CSV processed successfully!' });
    })
    .on('error', (err) => {
      fs.unlinkSync(filePath);
      console.error('Error processing CSV:', err);
      res.status(500).json({ error: 'Error processing CSV file.', details: err.message });
    });
};

/**
 * Retrieve the stored schedule CSV data.
 * 
 * Responds with the parsed schedule CSV data stored in memory.
 * If no data is available, returns a 404 error prompting the user to upload a file first.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object, used to send a JSON response.
 */
exports.getCSVData = (req, res) => {
  if (csvDataStore.length === 0) {
    return res.status(404).json({ error: 'No schedule data available. Please upload a CSV file first.' });
  }
  res.status(200).json({ data: csvDataStore });
};

/**
 * Retrieve the stored classes CSV data.
 * 
 * Responds with the parsed classes CSV data stored in memory.
 * If no data is available, returns a 404 error prompting the user to upload a file first.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object, used to send a JSON response.
 */
exports.getClassesData = (req, res) => {
  if (classesDataStore.length === 0) {
    return res.status(404).json({ error: 'No classes data available. Please upload a CSV file first.' });
  }
  res.status(200).json({ data: classesDataStore });
};
