const express = require('express');
const multer = require('multer');
const { uploadCSV, getCSVData } = require('../controllers/csvController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/upload-csv', upload.single('file'), uploadCSV);

router.get('/csv-data', getCSVData);

module.exports = router;
