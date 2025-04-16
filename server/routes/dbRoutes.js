const express = require("express");
const router = express.Router();
const {getAllCaregivers} = require('../controllers/dbController');

router.get("/home", getAllCaregivers);

router.post("/new-availability", function(req, res) {
	// validate caregiver name, date, start time, end time
	// call function from dbController
	// return status
})

module.exports = router;
