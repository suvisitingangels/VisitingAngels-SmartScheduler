// server/controllers/csvController.js

/**
 * CSV Controller
 * Handles the upload and processing of CSV files and provides access to the stored data.
 */

const csvParser = require('csv-parser');
const { PassThrough } = require('stream');                       // ⬅️ CHANGED: bring in PassThrough
// const fs = require('fs');                                      // no longer needed

const csvDataStore     = [];        // In-memory store for schedule CSV data
const classesDataStore = [];        // In-memory store for classes CSV data

exports.uploadCSV = (req, res) => {
  const file = req.file;
  if (!file || !file.originalname.endsWith('.csv')) {
    return res.status(400).json({ error: 'Please upload a valid CSV file.' });
  }

  const results = [];
  const bufferStream = new PassThrough();                       // ⬅️ CHANGED
  bufferStream.end(file.buffer);                                // ⬅️ CHANGED

  bufferStream
    .pipe(csvParser())
    .on('data', (row) => results.push(row))
    .on('end', () => {
      csvDataStore.splice(0, csvDataStore.length, ...results);
      res.status(200).json({ message: 'Schedule CSV processed successfully!' });
    })
    .on('error', (err) => {
      console.error('Error processing CSV:', err);
      res.status(500).json({ error: 'Error processing CSV file.', details: err.message });
    });
};

exports.uploadClassesCSV = (req, res) => {
  const file = req.file;
  if (!file || !file.originalname.endsWith('.csv')) {
    return res.status(400).json({ error: 'Please upload a valid CSV file.' });
  }

  const results = [];
  const bufferStream = new PassThrough();                       // ⬅️ CHANGED
  bufferStream.end(file.buffer);                                // ⬅️ CHANGED

  bufferStream
    .pipe(csvParser())
    .on('data', (row) => {
      if (row.classes) {
        row.classes = row.classes.split(',').map((cls) => cls.trim());
      }
      results.push(row);
    })
    .on('end', () => {
      classesDataStore.splice(0, classesDataStore.length, ...results);
      res.status(200).json({ message: 'Classes CSV processed successfully!' });
    })
    .on('error', (err) => {
      console.error('Error processing CSV:', err);
      res.status(500).json({ error: 'Error processing CSV file.', details: err.message });
    });
};

exports.getCSVData = (req, res) => {
  if (csvDataStore.length === 0) {
    return res.status(404).json({ error: 'No schedule data available. Please upload a CSV file first.' });
  }
  res.status(200).json({ data: csvDataStore });
};

exports.getClassesData = (req, res) => {
  if (classesDataStore.length === 0) {
    return res.status(404).json({ error: 'No classes data available. Please upload a CSV file first.' });
  }
  res.status(200).json({ data: classesDataStore });
};
