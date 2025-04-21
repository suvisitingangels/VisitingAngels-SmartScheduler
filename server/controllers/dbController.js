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

async function insertAvailability(req, res) {
	// const {name, date, startTime, endTime} = req.body;
	const formData = req.body;

	try {
		const query = 'INSERT INTO `availabilities` (`user_id`, `available_date`, `start_time`, `end_time`) VALUES (?, ?, ?, ?)';
		const values = [formData.user_id, formData.date, formData.start_time, formData.end_time];
		const [result] = await pool.promise().query(query, values);
		res.status(201);
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
	  return res.status(200).json(rows[0]);
	} catch (err) {
	  console.error('getCaregiverProfile error:', err);
	  return res.status(500).json({ error: 'Internal server error' });
	}
  }


module.exports = {
	getAllCaregivers,
	getAllAvailabilities,
	insertAvailability,
	getCaregiverProfile
}