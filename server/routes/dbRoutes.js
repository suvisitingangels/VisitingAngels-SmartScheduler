const express = require("express");
const router = express.Router();
const {getAllCaregivers, getAllAvailabilities, getAvailabilitiesByUser, insertAvailability, getCaregiverProfile} = require('../controllers/dbController');

router.get("/", getAllAvailabilities);

router.get("/filtered-availabilities/:username", getAvailabilitiesByUser);

router.post(`/:username/new-availability`,insertAvailability);

router.get('/caregiver/:username', getCaregiverProfile);

module.exports = router;
