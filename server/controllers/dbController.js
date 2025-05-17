const http = require('http');
const mysql = require('mysql2/promise');
const {pool} = require('../db/connection');
const promise = pool.promise();

function addLeadingZero(value) {
	return `${value < 9 ? "0" : ""}${value}`;
}

async function deleteAvailabilityDateTime(req, res) {
	const formData = req.body;
	try {
		const query = 'DELETE FROM availabilities where user_id=? AND available_date=? and start_time=? and end_time=?';
		const values = [formData.body.user_id, formData.body.date, formData.body.start_time, formData.body.end_time];
		const [result] = await promise.query(query, values);
		if (result.affectedRows === 0) {
			return res.status(404).json({error: 'Availability not found'});
		}
		return res.json({message: 'Availability deleted'});
	} catch (e) {
		console.error(e);
		res.status(500);
	}
}

async function deletePastAvailability(req, res) {
	const today = new Date();
	const fullDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
	try {
		const query = `DELETE FROM availabilities where available_date < "${fullDate}";`;
		await promise.query(query);
		return res.status(200).json({message: 'Past availability deleted.'});
	} catch (e) {
		console.error(e);
		res.status(500);
	}
}

async function getAllAvailabilities(req, res) {
	try {
		const query = 'SELECT * FROM availabilities ORDER BY available_date, start_time';
		const [rows] = await promise.query(query);
		return res.json({rows});
	} catch (e) {
		console.error(e);
	}
}

async function getAvailabilitiesByUser(req, res) {
	try {
		const username = req.params.username;

		const query = `SELECT * FROM availabilities WHERE user_id = '${username}' ORDER BY available_date`;
		const [availabilities] = await promise.query(query);
		return res.json({availabilities}).status(200);
	} catch (e) {
		console.error('Error retrieving availabilities', e);
		return res.status(500).json({error: 'Internal server error.'});
	}
}

async function getCaregiverProfile(req, res) {
	try {
		const username = req.params.username;
		const query = 'SELECT * FROM caregivers WHERE user_id = ?';
		const [rows] = await promise.query(query, [username]);

		if (rows.length === 0) {
			return res.status(404).json({ error: 'Caregiver not found' });
		}

		// return just the single object
		return res.status(200).json({rows});
	} catch (err) {
		console.error('getCaregiverProfile error:', err);
		return res.status(500).json({ error: 'Internal server error' });
	}
}

async function insertAvailability(formData, date) {
	try {
		const query = 'INSERT INTO `availabilities` (`user_id`, `available_date`, `start_time`, `end_time`) VALUES (?, ?, ?, ?)';
		const values = [formData.user_id, date, formData.start_time, formData.end_time];
		const [result] = await promise.query(query, values);
		return result.insertId;
	} catch (e) {
		console.error(e)
		return e;
	}
}

async function insertRecurringAvailability(req, res) {
	const formData = req.body;

	// Data validation
	if (formData.recurring === "none") {
		formData.numRecurrences = 1;
	} else {
		formData.numRecurrences = parseInt(formData.numRecurrences);
	}
	// Must be converted to a Date object in order to add to it
	let dateObject = new Date(`${formData.date}T${formData.start_time}`);

	for (let i = 0; i < formData.numRecurrences; i++) {
		let date = `${dateObject.getFullYear()}-${addLeadingZero(dateObject.getMonth() + 1)}-${addLeadingZero(dateObject.getDate())}`;
		const result = await insertAvailability(formData, date);
		if (typeof(result) !== "number") {
			return res.status(500);
		}
		let intervalIncrease = (formData.recurring === "weekly" && 7) || (formData.recurring === "biweekly" && 14);
		dateObject.setDate(dateObject.getDate() + intervalIncrease);
	}
	return res.status(201).send("Successful");
}

async function removeAvailability(req, res) {
	const {id} = req.params;

	try {
		const query = 'SELECT * FROM availabilities WHERE id = ?';
		const [rows] = await promise.query(query, [id]);

		if (rows.length === 0) {
			return res.status(404).json({error: 'Availability not found'});
		}

		const deleteQuery = 'DELETE FROM availabilities WHERE id = ?';
		const [result] = await promise.query(deleteQuery, [id]);
		if (result.affectedRows === 0) {
			return res.status(404).json({error: 'Availability not found'});
		}
		return res.json({message: 'Availability deleted'});

	} catch (e) {
		console.error('Error deleting availability', e);
		return res.status(500).json({error: 'Internal server error'});
	}
}

async function updateCaregiverInfo(req, res) {
	const {username} = req.params;
	const profileForm = req.body;
	console.log(profileForm);

	let updateProfileQuery = "UPDATE caregivers set "
	for (const [key, value] of Object.entries(profileForm)) {
		console.log(key, value)
		if (updateProfileQuery.slice(18) === "set ") {
			updateProfileQuery += `${key} = \"${value}\"`
		} else {
			updateProfileQuery += `, ${key} = \"${value}\"`

		}
	}
	updateProfileQuery += ` where user_id = \"${username}\"`;
	console.log(updateProfileQuery);

	try {
		const [result] = await promise.query(updateProfileQuery);
		console.log(result);
		if (result.affectedRows === 0) {
			return res.status(404).json({error: 'Caregiver not found'});
		}
		return res.status(201).json({message: "Profile updated"});
	} catch (e) {
		console.error(e);
		res.status(500).json({error: "Could not update"});
	}
}

module.exports = {
	deleteAvailabilityDateTime,
	deletePastAvailability,
	getAllAvailabilities,
	getAvailabilitiesByUser,
	getCaregiverProfile,
	insertRecurringAvailability,
	removeAvailability,
	updateCaregiverInfo
}