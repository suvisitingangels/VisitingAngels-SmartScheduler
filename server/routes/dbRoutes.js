const express = require("express");
const router = express.Router();
const {getAllCaregivers, getAllAvailabilities, insertAvailability} = require('../controllers/dbController');

router.get("/", getAllAvailabilities);

router.get("/filtered-availabilities", getAvailabilitiesByUser);

router.post("/new-availability",insertAvailability);

router.get('/caregiver/:username', getCaregiverProfile);

module.exports = router;
