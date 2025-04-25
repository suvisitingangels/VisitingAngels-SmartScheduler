const express = require("express");
const router = express.Router();
const {getAllCaregivers, getAllAvailabilities, getAvailabilitiesByUser, insertAvailability, getCaregiverProfile, removeAvailability} = require('../controllers/dbController');

router.get("/", getAllAvailabilities);

router.get("/filtered-availabilities/:username", getAvailabilitiesByUser);

router.post(`/new-availability`,insertAvailability);

router.get('/caregiver/:username', getCaregiverProfile);

router.delete('/availability/:id', removeAvailability);

module.exports = router;
