const csvDataStore = []; 

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
      res.status(200).json({ message: 'CSV processed successfully!' });
    })
    .on('error', (err) => {
      fs.unlinkSync(filePath);
      console.error('Error processing CSV:', err);
      res.status(500).json({ error: 'Error processing CSV file.', details: err.message });
    });
};

exports.getCSVData = (req, res) => {
  if (csvDataStore.length === 0) {
    return res.status(404).json({ error: 'No data available. Please upload a CSV file first.' });
  }
  res.status(200).json({ data: csvDataStore });
};
