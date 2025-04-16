// src/pages/Scheduler/Availability/Availability.js

/**
 * Availability Component
 *
 * This component renders a form to update a caregiver's availability.
 * Users can add or remove availability for a caregiver by specifying the name, date, and time.
 * The form supports dynamic state updates and handles form submission.
 */

import React, {useEffect, useState} from 'react';
import './Availability.css';

function Availability() {
	// State to store form data
	const [formData, setFormData] = useState({
		user_id: 'admin.admin',
		date: '',
		start_time: '',
		end_time: ''
	});
	const [caregiverName, setCaregiverName] = useState('FirstName LastName');


	useEffect(() => {
		// TODO: Get user's first/last name from login
		// then setFormData user_id
	})

	/**
	 * Handle input changes in the form fields.
	 * Updates the corresponding field in the formData state.
	 *
	 * @param {Object} e - The input change event.
	 */
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};


	/**
	 * Handle form submission.
	 * Logs the current form data to the console.
	 *
	 * @param {Object} e - The form submit event.
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();

		// TODO: need to fetch to database once submitted and then we can send submission alert
		const response = await fetch('http://localhost:5000/api/db/new-availability', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(formData),
		})
		console.log(response);

		if (!response.ok) {
			throw new Error('Failed to input availability');
		}
		else {
			alert("Submission successful!")
			setFormData({
				user_id: '',
				date: '',
				start_time: '',
				end_time: ''
			})
		}
	};

	return (
		<div className="availability-container">
			<div className="availability-header">
				<h2>Update Availability</h2>
			</div>

			{/* Form Section */}
			<form className="availability-form" onSubmit={handleSubmit}>

				<label>
					Caregiver Name:
					<input
						type={"text"}
						id={"caregiver-name"}
						readOnly
						value={formData.user_id}
					/>
				</label>

				<label>
					Date:
					<input
						type="date"
						name="date"
						value={formData.date}
						onChange={handleChange}
					/>
				</label>

				<label>
					From:
					<input
						type="time"
						name="start_time"
						value={formData.start_time}
						onChange={handleChange}
					/>
				</label>

				<label>
					To:
					<input
						type="time"
						name="end_time"
						value={formData.end_time}
						onChange={handleChange}
					/>
				</label>

				<button type="submit">Add</button>
			</form>
		</div>
	);
}

export default Availability;
