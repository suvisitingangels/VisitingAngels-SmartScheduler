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

function preprocessCsv(buffer, firstLineSkipCount) {
  // turn buffer into array of lines
  const text = buffer.toString('utf8');
  const lines = text.split(/\r?\n/);

  // pull off the very first line for validation
  const headerInfo = lines
    .shift()
    .split(',')
    .map(s => {
      // trim whitespace
      let val = s.trim();
      // if it starts+ends with a quote, remove them
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      }
      return val;
    });

  // drop the next N lines
  lines.splice(0, firstLineSkipCount - 1);

  // re-join the remainder (first CSV header now at lines[0])
  const cleanedCsv = lines.join('\n');

  return { cleanedCsv, headerInfo };
}

exports.uploadCSV = (req, res) => {
  const file = req.file;
  if (!file || !file.originalname.endsWith('.csv')) {
    return res.status(400).json({ error: 'Please upload a valid CSV file.' });
    }
 
  // preprocess: read first line, skip next 16
  const { cleanedCsv, headerInfo } = preprocessCsv(file.buffer, 16);

  // guardrail: schedule endpoint must see “Reports - Visits By Caregiver”
  if (headerInfo[0] !== 'Report:' ||
    headerInfo[1] !== 'Reports - Visits By Caregiver') {
    console.log("ERROR HAPPENED");
    return res.status(400).json({
        error: 'This file is not a caregiver schedule. Please upload the correct CSV type.'
      });
  }

  const results = [];
  const bufferStream = new PassThrough();                       
  bufferStream.end(Buffer.from(cleanedCsv, 'utf8'));          

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
  console.log('⏺️  uploadCSV invoked');
  const file = req.file;
  if (!file || !file.originalname.endsWith('.csv')) {
    return res.status(400).json({ error: 'Please upload a valid CSV file.' });
  }

  const { cleanedCsv, headerInfo } = preprocessCsv(file.buffer, 8);

  if (headerInfo[0] !== 'Report:' ||
    headerInfo[1] !== 'Report - Classes') {
    console.log("ERROR HAPPENED");
    return res.status(400).json({
      error: 'This file is not classes. Please upload the correct CSV type.'
    });
  }

  const results = [];
  const bufferStream = new PassThrough();                      
  bufferStream.end(Buffer.from(cleanedCsv, 'utf8'));                                

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
