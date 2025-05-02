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

		const promise = pool.promise();
		const query = `SELECT * FROM availabilities WHERE user_id = '${username}' ORDER BY available_date`;
		const [availabilities] = await promise.query(query);
		return res.json({availabilities}).status(200);
	} catch (e) {
		console.error('Error retrieving availabilities', e);
		return res.status(500).json({error: 'Internal server error.'});
	}
}

async function insertAvailability(req, res) {
	const formData = req.body;

	try {
		const query = 'INSERT INTO `availabilities` (`user_id`, `available_date`, `start_time`, `end_time`) VALUES (?, ?, ?, ?)';
		const values = [formData.user_id, formData.date, formData.start_time, formData.end_time];
		const [result] = await pool.promise().query(query, values);
		const availability = result.id;
		return res.status(201).json({message: 'Submission successful.', availability});
	} catch (e) {
		console.error(e);
		res.status(500);
	}
}

async function getCaregiverProfile(req, res) {
	try {
	  const username = req.params.username;
	  const query = 'SELECT * FROM caregivers WHERE user_id = ?';
	  const [rows] = await pool.promise().query(query, [username]);

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

  async function removeAvailability(req, res) {
	const {id} = req.params;

	try {
		const promise = pool.promise();
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

async function deleteAvailabilityDateTime(req, res) {
	const formData = req.body;
	try {
		const query = 'DELETE FROM availabilities where user_id=? AND available_date=? and start_time=? and end_time=?';
		const values = [req.body.user_id, req.body.date, req.body.start_time, req.body.end_time];
		const [result] = await pool.promise().query(query, values);
		if (result.affectedRows === 0) {
			return res.status(404).json({error: 'Availability not found'});
		}
		return res.json({message: 'Availability deleted'});

	} catch (e) {
		console.error(e);
		res.status(500);
	}
}

module.exports = {
	getAllCaregivers,
	getAllAvailabilities,
	getAvailabilitiesByUser,
	insertAvailability,
	getCaregiverProfile,
	removeAvailability,
	deleteAvailabilityDateTime
}