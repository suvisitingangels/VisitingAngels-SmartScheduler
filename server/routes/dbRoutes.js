const express = require("express");
const router = express.Router();
const {getAllCaregivers, getAllAvailabilities, insertAvailability, getCaregiverProfile} = require('../controllers/dbController');

router.get("/", getAllAvailabilities);

router.get("/home", getAllCaregivers);

router.post("/new-availability",insertAvailability);

router.get('/caregiver/:username', getCaregiverProfile);

module.exports = router;
