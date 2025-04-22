const mysql = require('mysql2/promise');
const {pool} = require('../db/connection')

async function getAllCaregivers(req, res) {
	try {
		const promise = pool.promise();
		const query = 'SELECT * FROM caregivers';
		const [rows] = await promise.query(query);
		return res.json({rows});
	} catch (e) {
		console.error(e);
	}
}

async function getAllAvailabilities(req, res) {
	try {
		const promise = pool.promise();
		const query = 'SELECT * FROM availabilities';
		const [rows] = await promise.query(query);
		return res.json({rows});
	} catch (e) {
		console.error(e);
	}
}

async function getAvailabilitiesByUser(req, res) {
	try {
		const promise = pool.promise();
		const query = 'SELECT * FROM availabilities WHERE user_id = \'admin.admin\' ORDER BY available_date';
		const [availabilities] = await promise.query(query);
		console.log(typeof(availabilities));
		return res.json({availabilities}).status(200);
	} catch (e) {
		console.error('Error retrieving availabilities', e);
		return res.status(500).json({error: 'Internal server error.'});
	}
}

async function insertAvailability(req, res) {
	// const {name, date, startTime, endTime} = req.body;
	const formData = req.body;
	console.log("formData");

	try {
		const query = 'INSERT INTO `availabilities` (`user_id`, `available_date`, `start_time`, `end_time`) VALUES (?, ?, ?, ?)';
		const values = [formData.user_id, formData.date, formData.start_time, formData.end_time];
		const [result] = await pool.promise().query(query, values);
		const availability = result.id;
		return res.status(201).json({message: 'Submission successful.', availability});
	} catch (e) {
		console.error(e);
		res.status(500).json({error: 'Internal server error.'});
	}
}


module.exports = {
	getAllCaregivers,
	getAllAvailabilities,
	getAvailabilitiesByUser,
	insertAvailability
}