const express = require("express");
const router = express.Router();
const {getAllCaregivers, getAllAvailabilities, insertAvailability} = require('../controllers/dbController');

router.get("/", getAllAvailabilities);

router.get("/home", getAllCaregivers);

router.post("/new-availability",insertAvailability);

module.exports = router;
