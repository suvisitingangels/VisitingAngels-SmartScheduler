// server/controllers/csvController.js

// ─── IMPORTS ───────────────────────────────────────────────────────────────────
const csvParser = require('csv‑parser');
const fs        = require('fs');

// ─── IN‑MEMORY DATA STORES ─────────────────────────────────────────────────────
const csvDataStore     = [];    // schedule CSV
const classesDataStore = [];    // classes CSV

// ─── UPLOAD SCHEDULE CSV ───────────────────────────────────────────────────────
exports.uploadCSV = (req, res) => {
  const file = req.file;
  if (!file || !file.originalname.endsWith('.csv')) {
    return res
      .status(400)
      .json({ error: 'Please upload a valid CSV file.' });
  }

  const results  = [];
  const filePath = file.path;

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', () => {
      fs.unlinkSync(filePath);
      // replace old data with new
      csvDataStore.splice(0, csvDataStore.length, ...results);
      res
        .status(200)
        .json({ message: 'Schedule CSV processed successfully!' });
    })
    .on('error', (err) => {
      fs.unlinkSync(filePath);
      console.error('Error processing CSV:', err);
      res
        .status(500)
        .json({ error: 'Error processing CSV file.', details: err.message });
    });
};

// ─── UPLOAD CLASSES CSV ────────────────────────────────────────────────────────
exports.uploadClassesCSV = (req, res) => {
  const file = req.file;
  if (!file || !file.originalname.endsWith('.csv')) {
    return res
      .status(400)
      .json({ error: 'Please upload a valid CSV file.' });
  }

  const results  = [];
  const filePath = file.path;

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      // Split the comma‑separated list in `row.classes` into an array:
      if (row.classes) {
        row.classes = row.classes
          .split(',')
          .map((cls) => cls.trim());
      }
      results.push(row);
    })
    .on('end', () => {
      fs.unlinkSync(filePath);
      classesDataStore.splice(0, classesDataStore.length, ...results);
      res
        .status(200)
        .json({ message: 'Classes CSV processed successfully!' });
    })
    .on('error', (err) => {
      fs.unlinkSync(filePath);
      console.error('Error processing CSV:', err);
      res
        .status(500)
        .json({ error: 'Error processing CSV file.', details: err.message });
    });
};

// ─── GET SCHEDULE CSV DATA ─────────────────────────────────────────────────────
exports.getCSVData = (req, res) => {
  if (csvDataStore.length === 0) {
    return res
      .status(404)
      .json({ error: 'No schedule data available. Please upload first.' });
  }
  res.status(200).json({ data: csvDataStore });
};

// ─── GET CLASSES CSV DATA ──────────────────────────────────────────────────────
exports.getClassesData = (req, res) => {
  if (classesDataStore.length === 0) {
    return res
      .status(404)
      .json({ error: 'No classes data available. Please upload first.' });
  }
  res.status(200).json({ data: classesDataStore });
};
