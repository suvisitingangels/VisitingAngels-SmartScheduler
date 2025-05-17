const express = require("express");
const router = express.Router();
const {deleteAvailabilityDateTime,
	deletePastAvailability,
	getAllAvailabilities,
	getAvailabilitiesByUser,
	getCaregiverProfile,
	insertRecurringAvailability,
	removeAvailability,
	updateCaregiverInfo} = require('../controllers/dbController');

router.get("/", getAllAvailabilities);

router.get("/filtered-availabilities/:username", getAvailabilitiesByUser);

router.post(`/new-availability`,insertRecurringAvailability);

router.get('/:username', getCaregiverProfile);

router.delete('/availability/:id', removeAvailability);

router.post('/availability', deleteAvailabilityDateTime);

router.delete('/past-availability', deletePastAvailability);

router.post('/:username/update-availability', updateCaregiverInfo);

module.exports = router;
