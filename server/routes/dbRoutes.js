const express = require("express");
const router = express.Router();
const {deleteAvailabilityDateTime,
	deletePastAvailability,
	getAllAvailabilities,
	getAvailabilitiesByUser,
	getCaregiverProfile,
	insertRecurringAvailability,
	removeAvailability} = require('../controllers/dbController');

router.get("/", getAllAvailabilities);

router.get("/filtered-availabilities/:username", getAvailabilitiesByUser);

router.post(`/new-availability`,insertRecurringAvailability);

router.get('/caregiver/:username', getCaregiverProfile);

router.delete('/availability/:id', removeAvailability);

router.post('/availability', deleteAvailabilityDateTime);

router.delete('/past-availability', deletePastAvailability);

module.exports = router;
