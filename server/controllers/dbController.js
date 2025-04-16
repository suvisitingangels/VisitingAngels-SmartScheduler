const mysql = require('mysql2/promise');
const {pool} = require('../db/connection')

async function getAllCaregivers(req, res) {
	try {
		const promise = pool.promise();
		const query = 'SELECT * FROM caregivers';
		const [rows] = await promise.query(query);
		console.log([rows]);
		return res.json({rows});
	} catch (e) {
		console.error(e);
	}
}


module.exports = {
	getAllCaregivers
}