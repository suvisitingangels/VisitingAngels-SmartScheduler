const express = require("express");
const router = express.Router();
const {getAllCaregivers, getAllAvailabilities, getAvailabilitiesByUser, insertAvailability} = require('../controllers/dbController');

router.get("/", getAllAvailabilities);

router.get("/filtered-availabilities", getAvailabilitiesByUser);

router.post("/new-availability",insertAvailability);

module.exports = router;
